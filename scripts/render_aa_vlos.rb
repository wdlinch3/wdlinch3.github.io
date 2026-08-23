#!/usr/bin/env ruby

require "fileutils"
require "pathname"
require "tmpdir"
require "yaml"

site_root = Pathname.new(__dir__).parent.expand_path
workspace_root = site_root.parent
manifest_path = site_root.join("_data", "aa_vlos.yml")
header_path = site_root.join("_includes", "aa_vlo_document_header.html")
quarto = ENV.fetch("QUARTO_BIN", "/Applications/quarto/bin/quarto")

abort "Missing VLO manifest: #{manifest_path}" unless manifest_path.file?
abort "Missing public VLO header: #{header_path}" unless header_path.file?
abort "Quarto is unavailable at #{quarto}" unless File.executable?(quarto)

entries = YAML.safe_load_file(manifest_path).select { |entry| entry["published"] }

entries.each do |entry|
  source = workspace_root.join(entry.fetch("source")).expand_path
  destination = site_root.join("aa", "vlo", entry.fetch("id")).expand_path
  pdf_name = Pathname.new(entry.fetch("pdf_url")).basename.to_s

  abort "Missing canonical VLO source: #{source}" unless source.file?
  css = source.dirname.join("standards_table.css")
  abort "Missing VLO stylesheet: #{css}" unless css.file?

  FileUtils.mkdir_p(destination)

  Dir.mktmpdir("aa-vlo-render-") do |temporary_directory|
    temporary = Pathname.new(temporary_directory)
    temporary_source = temporary.join("document.qmd")
    FileUtils.cp(source, temporary_source)
    FileUtils.cp(css, temporary.join("standards_table.css"))

    html_command = [
      quarto, "render", temporary_source.basename.to_s,
      "--to", "html",
      "--output", "index.html",
      "--embed-resources",
      "--include-before-body=#{header_path}"
    ]

    pdf_command = [
      quarto, "render", temporary_source.basename.to_s,
      "--to", "pdf",
      "--output", pdf_name
    ]

    tex_cache = temporary.join("tex-cache")
    FileUtils.mkdir_p(tex_cache)
    tex_environment = {
      "TEXMFCACHE" => tex_cache.to_s,
      "TEXMFVAR" => tex_cache.to_s
    }

    abort "HTML render failed for #{entry.fetch('course')}" unless system(*html_command, chdir: temporary_directory)
    abort "PDF render failed for #{entry.fetch('course')}" unless system(tex_environment, *pdf_command, chdir: temporary_directory)

    html_path = temporary.join("index.html")
    html = html_path.read
    html = html.gsub(/<table([^>]*)>/, '<div class="aa-vlo-table-scroll" role="region" aria-label="Scrollable learning-objectives table" tabindex="0"><table\\1>')
    html = html.gsub("</table>", "</table></div>")
    html_path.write(html)

    FileUtils.cp(html_path, destination.join("index.html"))
    FileUtils.cp(temporary.join(pdf_name), destination.join(pdf_name))
  end

  html_output = destination.join("index.html")
  pdf_output = destination.join(pdf_name)
  abort "Missing rendered HTML: #{html_output}" unless html_output.file?
  abort "Missing rendered PDF: #{pdf_output}" unless pdf_output.file?

  puts "Rendered #{entry.fetch('course')}: #{html_output.relative_path_from(site_root)} and #{pdf_output.relative_path_from(site_root)}"
end
