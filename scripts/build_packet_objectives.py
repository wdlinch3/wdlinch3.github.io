#!/usr/bin/env python3
"""Import canonical objective rows; resolve packet mappings without copying authored wording.
Run with --workspace-root pointing to the umbrella checkout when using a worktree.
"""
import argparse, hashlib, json, re
from pathlib import Path
import yaml

site=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser(); p.add_argument('--workspace-root',type=Path,default=site.parent); args=p.parse_args()
manifest=yaml.safe_load((site/'_data/aa_packet_objectives.yml').read_text())
catalog={}; courses={}; provenance={}
for course,label in [('ss','Solar System'),('x','Shared mathematics and physics')]:
 source=args.workspace_root/'support-files/aa@tj_general_info/vlo'/f'vlo_aa_{course}.qmd'
 text=source.read_text(); provenance[course]={'source':str(source.relative_to(args.workspace_root)),'sha256':hashlib.sha256(source.read_bytes()).hexdigest()}
 section=prefix=topic=None; course_codes=[]
 for line in text.splitlines():
  if line.startswith('## '): section=line[3:]
  match=re.search(r'Code \(`([^`]+)`\)',line)
  if match: prefix=match[1]; topic=None; continue
  if not line.startswith('|') or not prefix: continue
  row=[s.strip() for s in line.strip('|').split('|')]
  if len(row)!=3 or not re.fullmatch(r'`[a-z0-9_]+\.\d+`',row[-1]): continue
  topic=row[0] or topic; code=prefix+row[-1].strip('`')
  wording=row[1].removeprefix('…').strip()
  entry={'section':section,'topic':topic,'text':wording}
  if code in catalog: assert catalog[code]['text']==wording,code
  else: catalog[code]=entry
  course_codes.append(code)
 courses[course]={'title':label,'codes':course_codes}
resolved={}
for pid,packet in manifest.items():
 selected=set(packet.get('codes',[]))
 for prefix in packet.get('prefixes',[]):
  matches=[c for c in catalog if c.startswith(prefix)]; assert matches,prefix; selected.update(matches)
 assert selected and not selected-catalog.keys(),(pid,selected-catalog.keys())
 resolved[pid]={**packet,'codes':[c for c in catalog if c in selected]}
 target=site/'aa/objectives'/pid; target.mkdir(parents=True,exist_ok=True)
 (target/'index.html').write_text('---\nlayout: aa_objectives\ncompact: true\npage_css: /assets/css/aa_objectives.css\nobjective_packet: '+pid+'\ntitle: '+json.dumps(packet['title']+' — Learning objectives',ensure_ascii=False)+'\n---\n')
for course,entry in courses.items():
 target=site/'aa/objectives'/course; target.mkdir(parents=True,exist_ok=True)
 (target/'index.html').write_text('---\nlayout: aa_objectives\ncompact: true\npage_css: /assets/css/aa_objectives.css\nobjective_course: '+course+'\ntitle: '+json.dumps(entry['title']+' — Complete objectives')+'\n---\n')
(site/'_data/aa_objectives.json').write_text(json.dumps({'catalog':catalog,'courses':courses,'packets':resolved,'provenance':provenance},indent=2,ensure_ascii=False)+'\n')
print(f'{len(catalog)} unique objectives; {len(resolved)} packet pages; {len(courses)} complete course pages')
