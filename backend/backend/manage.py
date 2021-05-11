#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'youtubedjango.settings')
    try:
        from django.core.management import execute_from_command_line

    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
        
    #! Python to look for modules in base directory 
    apps = ['accounts', 'videos']

    BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname((__file__))))
    BASE_DIR_1 = ''
    
    if BASE_DIR[-1: -len('backend') - 1: -1] == 'backend'[::-1]:
        BASE_DIR = os.path.dirname(BASE_DIR)

    sys.path.insert(1, BASE_DIR)

    for app in apps:
        sys.path.insert(1, os.path.join(BASE_DIR, app))
    
    execute_from_command_line(sys.argv)
    
    
    


if __name__ == '__main__':
    main()
