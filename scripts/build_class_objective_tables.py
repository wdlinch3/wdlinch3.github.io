#!/usr/bin/env python3
"""Derive class-styled table editions from the freshly rendered canonical documents."""
from pathlib import Path
from bs4 import BeautifulSoup
import yaml
site=Path(__file__).resolve().parents[1]
for entry in yaml.safe_load((site/'_data/aa_vlos.yml').read_text()):
 if not entry['published']:continue
 source=site/entry['html_url'].strip('/')/'index.html'
 soup=BeautifulSoup(source.read_text(),'html.parser'); main=soup.find('main')
 if main is None:
  main=BeautifulSoup('<main></main>','html.parser').main
  for child in list(soup.body.children):
   if getattr(child,'name',None) in ('header','section'): main.append(child)
 assert main and main.find('table'),source
 # Keep the entire document body; only the outer site shell differs.
 content=''.join(str(child) for child in main.contents)
 links=''.join(f'<a href="#{section["id"]}">{section.find(["h1","h2"]).get_text()}</a>' for section in main.select('section.level2') if section.find('table'))
 content='<nav class="objective-sections" aria-label="Objective topics">'+links+'</nav>'+content
 include=site/'_includes/objective_tables'/f"{entry['id']}.html";include.parent.mkdir(exist_ok=True)
 include.write_text('{% raw %}\n'+content+'\n{% endraw %}\n')
 target=site/entry['class_html_url'].strip('/')/'index.html';target.parent.mkdir(parents=True,exist_ok=True)
 target.write_text('---\nlayout: aa_ss_class\nobjectives_page: true\ntitle: "'+entry['course']+' — Complete learning objectives"\n---\n<nav class="objective-nav" aria-label="Objectives navigation"><a href="{{ \'/aa/ss/2026-2027/\' | relative_url }}">Class page</a><a href="{{ \'/aa/objectives/\' | relative_url }}">Complete course objectives</a><a href="'+entry['pdf_url']+'">Download PDF</a></nav>\n{% include objective_tables/'+entry['id']+'.html %}\n')
 print(entry['id'],len(main.select('tbody tr')),'table rows copied faithfully')
