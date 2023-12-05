# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

import os
import sys
import django

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'University of Nebraska - Computer Science Tutoring Portal'
copyright = '2023, Nolan Gregory'
author = 'Nolan Gregory'
release = '0.0.1'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ["sphinx.ext.autodoc",
              "sphinx.ext.extlinks",
              "sphinx.ext.mathjax",
              "sphinx.ext.viewcode",
              'sphinx.ext.napoleon',
              'sphinx.ext.todo',
              'sphinx.ext.intersphinx',
              'sphinx.ext.doctest',
              'sphinx_copybutton',
              "myst_parser",
              'sphinx_js'
              ]

templates_path = ['_templates']
exclude_patterns = []

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

js_source_path = '../../frontend'

html_theme = "furo"
html_static_path = ['_static']

sys.path.insert(0, os.path.abspath(
    os.path.join('..', '..', 'backend')))

os.environ['DJANGO_SETTINGS_MODULE'] = 'base.settings'

django.setup()

# autodoc_typehints = "description"
# autodoc_class_signature = "separated"
html_logo = "docsico.png"
html_title = "Docs"
language = "en"

pygments_style = "sphinx"
pygments_dark_style = "monokai"

html_title = "University of Nebraska Tutoring Portal"

html_theme_options = {
    "announcement": "<em>Important:</em> Beta Release coming soon!",
}

intersphinx_mapping = {
    "python": ("https://docs.python.org/3", None),
    "sphinx": ("https://www.sphinx-doc.org/en/master", None),
}

todo_include_todos = True
