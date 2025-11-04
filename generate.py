import os
import shutil
import json
#import yaml
from jinja2 import Environment, FileSystemLoader

# Setup Jinja2 environment (loads from 'templates/')
env = Environment(loader=FileSystemLoader('templates'))

# Pages to render (map route to template and data)
with open('data/faq.json', 'r') as f:
    faq_data = json.load(f)

# pass this to every page so the nav gets rendered properly
with open('data/catalog.json', 'r') as f:
    catalog_data = json.load(f)

pages = [
    {'route':  'index.html',         'template':  'index.html',         'data':  {"catalog_data":  catalog_data}},               
    {'route':  'catalog.html',       'template':  'catalog.html',       'data':  {"catalog_data":  catalog_data}},               
    {'route':  'blog.html',          'template':  'blog.html',          'data':  {"catalog_data":  catalog_data}},               
    {'route':  'how_to_order.html',  'template':  'how_to_order.html',  'data':  {"catalog_data":  catalog_data}},               
    {'route':  'faq.html',           'template':  'faq.html',           'data':  {"catalog_data":  catalog_data,    "faq_data":  faq_data}},
    {'route':  'contact.html',       'template':  'contact.html',       'data':  {"catalog_data":  catalog_data}},               
]


# Load data if available
#if os.path.exists('data/pages.yaml'):
#    with open('data/pages.yaml', 'r') as f:
#        data = yaml.safe_load(f)
#    # Apply data to pages
#    for page in pages:
#        key = page['route'].replace('.html', '')
#        if key in data:
#            page['data'].update(data[key])

# Create build directory
build_dir = 'build'
os.makedirs(build_dir, exist_ok=True)

# Render each page
for page in pages:
    template = env.get_template(page['template'])
    content = template.render(**page['data'])
    output_path = os.path.join(build_dir, page['route'])
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w') as f:
        f.write(content)
    print(f"Generated: {output_path}")

# Copy static files
if os.path.exists('static'):
    shutil.copytree('static', os.path.join(build_dir, 'static'), dirs_exist_ok=True)
    print("Copied static files.")
