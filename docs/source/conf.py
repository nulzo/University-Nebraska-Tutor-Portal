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

sys.path.insert(0, os.path.abspath(
    os.path.join('..', '..', 'backend')))

os.environ['DJANGO_SETTINGS_MODULE'] = 'base.settings'

django.setup()

extensions = ['sphinx.ext.autodoc',
              'sphinx.ext.napoleon']

templates_path = ['_templates']
exclude_patterns = []

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'alabaster'
html_static_path = ['_static']
