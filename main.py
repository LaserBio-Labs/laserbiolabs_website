import jinja2
import json
import os
import shutil

# Setup directories
os.makedirs('build', exist_ok=True)
os.makedirs('build/product', exist_ok=True)
os.makedirs('build/blog', exist_ok=True)

# Copy static files
shutil.copytree('static', 'build/static', dirs_exist_ok=True)

# Jinja environment
env = jinja2.Environment(loader=jinja2.FileSystemLoader('templates'))

# Load data
with open('data/products.json') as f:
    product_data = json.load(f)

with open('data/faq.json') as f:
    faq_data = json.load(f)

with open('data/blog.json') as f:
    blog_data = json.load(f)

with open('data/features.json') as f:
    features_data = json.load(f)

with open('data/trusted.json') as f:
    trusted_data = json.load(f)

with open('data/contact.json') as f:
    contact_data = json.load(f)

# Flatten products for detail pages
all_products = []
for section in product_data:
    for prod in section['products']:
        all_products.append({
            **prod,
            'category': section['section'],
            'category_text': section['text'],
            'image': section['img']
        })

# Render home
template = env.get_template('home.html')
html = template.render(features=features_data, trusted=trusted_data)
with open('build/index.html', 'w') as f:
    f.write(html)

# Render catalogue
template = env.get_template('catalogue.html')
html = template.render(sections=product_data)
with open('build/catalogue.html', 'w') as f:
    f.write(html)

# Render product details
template = env.get_template('product_detail.html')
for prod in all_products:
    html = template.render(product=prod)
    with open(f'build/product/{prod["title"]}.html', 'w') as f:
        f.write(html)

# Render FAQ
template = env.get_template('faq.html')
html = template.render(faq=faq_data)
with open('build/faq.html', 'w') as f:
    f.write(html)

# Render contact
template = env.get_template('contact.html')
html = template.render(contact=contact_data)
with open('build/contact.html', 'w') as f:
    f.write(html)

# Render blog overview
template = env.get_template('blog.html')
html = template.render(posts=blog_data, is_overview=True)
with open('build/blog.html', 'w') as f:
    f.write(html)

# Render blog posts
template = env.get_template('blog.html')
for post in blog_data:
    html = template.render(post=post, is_overview=False)
    with open(f'build/blog/{post["id"]}.html', 'w') as f:
        f.write(html)

print("Build complete. Files generated in 'build/' directory.")
