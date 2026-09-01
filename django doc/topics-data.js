// ============================================================
//  Django Notes — All 30 Topics Data
//  Used by: index.html, topic.html, add-topic.html
// ============================================================

const DEFAULT_TOPICS = [
  {
    id: 1,
    title: "Django URL Configuration",
    description: `Django URL configuration maps URLs to view functions using <code>urlpatterns</code> list in <code>urls.py</code>. Each <code>path()</code> call connects a URL pattern to a view function. You can use the <code>name</code> parameter to reference URLs by name in templates using the <code>{% url %}</code> tag.`,
    sections: [
      {
        heading: "urls.py",
        code: `from django.contrib import admin
from django.urls import path
from my import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('course/', views.Course),
    path('course/<int:courseid>', views.courseDetails),
]`
      },
      {
        heading: "views.py",
        code: `from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    return HttpResponse("Welcome to Wscubetech")


def Course(request):
    return HttpResponse("Welcome to Wscubetech")


def courseDetails(request, courseid):
    return HttpResponse(f"hi boss {courseid}")`
      }
    ]
  },
  {
    id: 2,
    title: "Dynamic URL",
    description: `Dynamic URLs allow passing variable data through the URL itself. Use angle brackets with a type converter (e.g. <code>&lt;int:courseid&gt;</code>) to capture URL segments as parameters passed to your view function.`,
    sections: [
      {
        heading: "urls.py — Dynamic URL pattern",
        code: `path('course/<int:courseid>', views.courseDetails)`
      },
      {
        heading: "views.py — Receive URL parameter",
        code: `def courseDetails(request, courseid):
    return HttpResponse(f"hi boss {courseid}")`
      },
      {
        heading: "Example",
        code: `# URL: /course/10
# Output: hi boss 10`
      }
    ]
  },
  {
    id: 3,
    title: "Templates",
    description: `Templates are HTML files Django renders to send to the browser. Create a <code>templates/</code> folder in your project root and configure its path in <code>settings.py</code> under the <code>DIRS</code> key. Then use <code>render()</code> in views to return HTML templates.`,
    sections: [
      {
        heading: "Folder structure",
        code: `mypro/
└── templates/
    └── index.html`
      },
      {
        heading: "settings.py — TEMPLATES DIRS",
        code: `TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR, "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]`
      },
      {
        heading: "views.py",
        code: `from django.shortcuts import render


def index(request):
    return render(request, "index.html")`
      },
      {
        heading: "urls.py",
        code: `path('index/', views.index, name='index')`
      }
    ]
  },
  {
    id: 4,
    title: "Passing Data to HTML",
    description: `Pass a Python dictionary (context) as the third argument to <code>render()</code>. Each key becomes a template variable accessible using double curly braces <code>{{ variable }}</code> in HTML templates.`,
    sections: [
      {
        heading: "views.py — Pass context dict",
        code: `from django.shortcuts import render


def index(request):
    data = {
        "k": "akshay"
    }

    return render(request, "index.html", data)`
      },
      {
        heading: "index.html — Use template variable",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<h1>don {{ k }}</h1>

hi boass

</body>
</html>`
      }
    ]
  },
  {
    id: 5,
    title: "For Loop",
    description: `Django templates support <code>{% for %}</code> loops to iterate over lists and dictionaries from the view context. Special <code>forloop</code> variables like <code>forloop.counter</code>, <code>forloop.first</code>, and <code>forloop.last</code> help with conditional rendering.`,
    sections: [
      {
        heading: "Syntax",
        code: `{% for item in items %}
    {{ item }}
{% endfor %}`
      },
      {
        heading: "views.py",
        code: `def index(request):
    data = {
        "courses": ["Python", "Django", "JavaScript"]
    }

    return render(request, "index.html", data)`
      },
      {
        heading: "index.html",
        code: `{% for course in courses %}
    <h2>{{ course }}</h2>
{% endfor %}`
      },
      {
        heading: "views.py — Example with Dict/List",
        code: `def homePage(request):
    data = {
        'title': 'Home New',
        'bdata': 'Welcome to Wscubetech',
        'clist': ['PHP', 'Java', 'Django'],
        'student_details': [
            {'name': 'pradeep', 'phone': 9269698122},
            {'name': 'testing', 'phone': 9269698122}
        ]
    }

    return render(request, "index.html", data)`
      },
      {
        heading: "index.html — Loop over dict list",
        code: `{% for d in student_details %}
<tr>
    <td>{{ d.name }}</td>
    <td>{{ d.phone }}</td>
</tr>
{% endfor %}`
      },
      {
        heading: "forloop Variables",
        code: `<ul>
{% for item in items %}
    <li>
        Item: {{ item }} <br>
        1-Indexed: {{ forloop.counter }} <br>
        0-Indexed: {{ forloop.counter0 }} <br>
        Reverse (1-idx): {{ forloop.revcounter }} <br>
        Reverse (0-idx): {{ forloop.revcounter0 }} <br>
        Is First? {{ forloop.first }} <br>
        Is Last? {{ forloop.last }}
    </li>
    <hr>
{% endfor %}
</ul>

<!-- counter → Starts at 1          -->
<!-- counter0 → Starts at 0         -->
<!-- revcounter → Counts down to 1  -->
<!-- revcounter0 → Counts down to 0 -->
<!-- first → True for first item    -->
<!-- last → True for last item      -->`
      }
    ]
  },
  {
    id: 6,
    title: "If-Else Logic",
    description: `Django templates support conditional logic using <code>{% if %}</code>, <code>{% elif %}</code>, and <code>{% else %}</code> blocks. They work just like Python conditions. Close the block with <code>{% endif %}</code>.`,
    sections: [
      {
        heading: "Syntax",
        code: `{% if condition %}
    ...
{% elif condition %}
    ...
{% else %}
    ...
{% endif %}`
      },
      {
        heading: "Example — Pass/Fail check",
        code: `{% if marks >= 50 %}
    Pass
{% else %}
    Fail
{% endif %}`
      }
    ]
  },
  {
    id: 7,
    title: "Static Files",
    description: `Static files (CSS, JS, images) are served from a <code>static/</code> folder. Use <code>{% load static %}</code> at the top of your template and <code>{% static 'path/to/file' %}</code> to reference static assets correctly.`,
    sections: [
      {
        heading: "Folder structure",
        code: `mypro/
├── static/
│   ├── css/
│   ├── images/
│   └── js/`
      },
      {
        heading: "Django Static Tag syntax",
        code: `{% load static %}

<link rel="stylesheet" href="{% static 'css/style.css' %}">

<script src="{% static 'js/script.js' %}"></script>

<img src="{% static 'images/as.png' %}">`
      }
    ]
  },
  {
    id: 8,
    title: "Include",
    description: `<code>{% include %}</code> lets you reuse HTML code from another file — perfect for headers, footers, and sidebars. This promotes DRY (Don't Repeat Yourself) principles in your templates.`,
    sections: [
      {
        heading: "header.html",
        code: `<header>
    <h1>Wscubetech</h1>
    <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
    </nav>
</header>`
      },
      {
        heading: "footer.html",
        code: `<footer>
    <p>&copy; 2026 Wscubetech. All Rights Reserved.</p>
</footer>`
      },
      {
        heading: "Using include in another HTML file",
        code: `{% include "header.html" %}

body content

{% include "footer.html" %}`
      }
    ]
  },
  {
    id: 9,
    title: "Extend & Block",
    description: `Template inheritance allows a child template to extend a base (parent) template. The base defines <code>{% block %}</code> areas that child templates can override. This keeps layout consistent across pages without code duplication.`,
    sections: [
      {
        heading: "base.html — Parent template",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>
        {% block title %}
        Simple Form
        {% endblock %}
    </title>
</head>

<body>

{% include "header.html" %}

{% block content %}
body content
{% endblock %}

{% include "footer.html" %}

</body>
</html>`
      },
      {
        heading: "index.html — Child template",
        code: `{% extends "base.html" %}

{% block title %}
Simple Form
{% endblock %}

{% block content %}

<hr>

<main>
    <h2>Contact Form</h2>

    <form>
        <label>Name:</label>
        <input type="text" name="name">

        <br><br>

        <label>Email:</label>
        <input type="email" name="email">

        <br><br>

        <label>Password:</label>
        <input type="password" name="password">

        <br><br>

        <label>Message:</label>
        <br>

        <textarea name="message" rows="5" cols="30"></textarea>

        <br><br>

        <button type="submit">Submit</button>
    </form>
</main>

<hr>

{% endblock %}`
      }
    ]
  },
  {
    id: 10,
    title: "URL Tag",
    description: `The <code>{% url %}</code> tag generates URLs from named URL patterns. Instead of hardcoding paths, reference them by name — so if your URL changes in <code>urls.py</code>, the template link updates automatically.`,
    sections: [
      {
        heading: "urls.py — Named URL",
        code: `path('', views.home, name='home')`
      },
      {
        heading: "HTML — Using URL tag",
        code: `<a href="{% url 'home' %}">Home</a>`
      }
    ]
  },
  {
    id: 11,
    title: "GET Method",
    description: `GET method sends form data through URL query strings (visible in the address bar). Use <code>request.GET.get('key')</code> to retrieve values. Ideal for search forms or non-sensitive data.`,
    sections: [
      {
        heading: "HTML form with GET",
        code: `<form method="GET">
    <input type="text" name="num1">
    <input type="text" name="num2">

    <button type="submit">Submit</button>
</form>`
      },
      {
        heading: "views.py — Read GET data",
        code: `def userform(request):

    n1 = request.GET.get('num1')
    n2 = request.GET.get('num2')

    return render(request, 'userform.html', {
        'n1': n1,
        'n2': n2
    })`
      },
      {
        heading: "Direct method",
        code: `request.GET['num2']`
      }
    ]
  },
  {
    id: 12,
    title: "POST Method",
    description: `POST method sends form data in the request body — not visible in the URL. Always include <code>{% csrf_token %}</code> in POST forms for security. Use <code>request.POST.get('key')</code> to retrieve values.`,
    sections: [
      {
        heading: "HTML form with POST",
        code: `<form method="POST">
    {% csrf_token %}

    <input type="text" name="num1">
    <input type="text" name="num2">

    <button type="submit">Submit</button>
</form>`
      },
      {
        heading: "views.py — Handle POST",
        code: `def userform(request):

    if request.method == "POST":

        n1 = request.POST.get('num1')
        n2 = request.POST.get('num2')

        return render(request, 'userform.html', {
            'n1': n1,
            'n2': n2
        })

    return render(request, 'userform.html')`
      },
      {
        heading: "Direct method",
        code: `request.POST['num2']`
      }
    ]
  },
  {
    id: 13,
    title: "Redirect Technique",
    description: `Redirects send the user to a different URL after processing. Django provides two approaches: <code>HttpResponseRedirect</code> from <code>django.http</code> and the shorter <code>redirect()</code> shortcut from <code>django.shortcuts</code>.`,
    sections: [
      {
        heading: "HttpResponseRedirect",
        code: `from django.http import HttpResponseRedirect

url = f"/aboutus/?output={finalans}"

return HttpResponseRedirect(url)`
      },
      {
        heading: "redirect() shortcut",
        code: `from django.shortcuts import redirect

url = f"/aboutus/?output={finalans}"

return redirect(url)`
      },
      {
        heading: "Example Flow",
        code: `# userform.html
#      ↓ POST
# userform()
#      ↓ Calculate
# Redirect
#      ↓
# /aboutus/?output=30
#      ↓
# aboutus()
#      ↓ GET output
# aboutus.html`
      }
    ]
  },
  {
    id: 14,
    title: "Redirect using HTML Form Action",
    description: `The HTML <code>action</code> attribute can redirect form submission to a different URL. The view at the target URL then reads the query parameters to process the data.`,
    sections: [
      {
        heading: "userform.html",
        code: `<form action="/aboutus/" method="GET">

    <input type="number" name="num1" required>

    <input type="number" name="num2" required>

    <button type="submit">
        Calculate Sum
    </button>

</form>`
      },
      {
        heading: "views.py",
        code: `def userform(request):
    return render(request, 'userform.html')


def aboutus(request):

    n1_str = request.GET.get('num1')
    n2_str = request.GET.get('num2')

    finalans = None

    if n1_str is not None and n2_str is not None:

        try:
            n1 = int(n1_str)
            n2 = int(n2_str)

            finalans = n1 + n2

        except ValueError:
            finalans = "Error: Invalid numeric input provided."

    return render(
        request,
        "aboutus.html",
        {'output': finalans}
    )`
      }
    ]
  },
  {
    id: 15,
    title: "Django Forms",
    description: `Django Forms (using <code>forms.Form</code>) provide a clean way to define form fields with validation, labels, and widget customization. They automatically handle rendering and validation logic.`,
    sections: [
      {
        heading: "forms.py — Define form class",
        code: `from django import forms


class Cal(forms.Form):

    n1 = forms.CharField()

    n2 = forms.CharField(
        label='n2',
        required=False,
        widget=forms.TextInput(
            attrs={'class': 'form-control'}
        )
    )`
      }
    ]
  },
  {
    id: 16,
    title: "Simple Calculator Project",
    description: `A complete calculator project using Django GET method. The form sends two numbers and an operation to a view that computes the result and returns it to the same page.`,
    sections: [
      {
        heading: "urls.py",
        code: `from django.contrib import admin
from django.urls import path
from my import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('cal/', views.cal, name='cal'),
]`
      },
      {
        heading: "views.py",
        code: `from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def cal(request):

    n1_str = request.GET.get('num1', '')
    n2_str = request.GET.get('num2', '')
    operation = request.GET.get('select-op', '+')

    output = None

    if n1_str != '' and n2_str != '':

        try:
            n1 = float(n1_str)
            n2 = float(n2_str)

            if operation == '+':
                output = n1 + n2
            elif operation == '-':
                output = n1 - n2
            elif operation == '*':
                output = n1 * n2
            elif operation == '/':
                if n2 == 0:
                    output = "Error: Cannot divide by zero."
                else:
                    output = n1 / n2

            if isinstance(output, float) and output.is_integer():
                output = int(output)

        except ValueError:
            output = "Error: Please enter valid numbers."

    context = {
        'n1': n1_str,
        'n2': n2_str,
        'operation': operation,
        'output': output
    }

    return render(request, 'cal.html', context)`
      },
      {
        heading: "cal.html",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Multi-Operation Calculator</title>
</head>
<body>

<h1>HTML Multi-Calculator</h1>

<form action="/cal/" method="GET">

    <label for="num1">First Number:</label>
    <input type="number" step="any" id="num1" name="num1"
        value="{{ n1 }}" required>

    <br><br>

    <label for="select-op">Operation:</label>

    <select id="select-op" name="select-op">
        <option value="+" {% if operation == "+" %}selected{% endif %}>+ (Addition)</option>
        <option value="-" {% if operation == "-" %}selected{% endif %}>- (Subtraction)</option>
        <option value="*" {% if operation == "*" %}selected{% endif %}>* (Multiplication)</option>
        <option value="/" {% if operation == "/" %}selected{% endif %}>/ (Division)</option>
    </select>

    <br><br>

    <label for="num2">Second Number:</label>
    <input type="number" step="any" id="num2" name="num2"
        value="{{ n2 }}" required>

    <br><br>

    <button type="submit">Calculate</button>

    <a href="/cal/">
        <button type="button">Reset</button>
    </a>

</form>

{% if output is not None %}
    <hr>
    {% if "Error" in output|stringformat:"s" %}
        <h2 style="color: red;">{{ output }}</h2>
    {% else %}
        <h2>Result: {{ n1 }} {{ operation }} {{ n2 }} = {{ output }}</h2>
    {% endif %}
{% endif %}

<br>
<a href="/">Back to Home</a>

</body>
</html>`
      }
    ]
  },
  {
    id: 17,
    title: "Marksheet Project",
    description: `A complete marksheet project that accepts 5 subject marks via POST, calculates total and percentage, and displays results on the same page.`,
    sections: [
      {
        heading: "urls.py",
        code: `urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('aboutus/', views.aboutus, name='aboutus'),
    path('userform/', views.userform, name='userform'),
    path('cal/', views.cal, name='cal'),
    path('marksheet/', views.marksheet, name='marksheet'),
]`
      },
      {
        heading: "views.py",
        code: `def marksheet(request):

    if request.method == "POST":

        s1 = eval(request.POST.get('subject1'))
        s2 = eval(request.POST.get('subject2'))
        s3 = eval(request.POST.get('subject3'))
        s4 = eval(request.POST.get('subject4'))
        s5 = eval(request.POST.get('subject5'))

        t = s1 + s2 + s3 + s4 + s5
        p = t * 100 / 500

        data = {
            'subject1': s1, 'subject2': s2,
            'subject3': s3, 'subject4': s4,
            'subject5': s5, 'total': t, 'per': p
        }

        return render(request, "marksheet.html", data)

    return render(request, "marksheet.html")`
      }
    ]
  },
  {
    id: 18,
    title: "Empty Form Validation",
    description: `Django supports both frontend and backend form validation. Frontend uses HTML attributes like <code>required</code>, <code>min</code>, <code>max</code>. Backend validation uses Django's <code>messages</code> framework to display error messages.`,
    sections: [
      {
        heading: "Frontend Validation — HTML",
        code: `<input type="number" name="subject1" placeholder="Subject1"
    min="0" max="100" required value="{{ subject1 }}">

<input type="number" name="subject2" placeholder="Subject2"
    min="0" max="100" required value="{{ subject2 }}">`
      },
      {
        heading: "views.py — Backend Validation",
        code: `from django.shortcuts import render
from django.contrib import messages


def marksheet(request):

    if request.method == "POST":

        s1_raw = request.POST.get('subject1', '').strip()
        s2_raw = request.POST.get('subject2', '').strip()
        s3_raw = request.POST.get('subject3', '').strip()
        s4_raw = request.POST.get('subject4', '').strip()
        s5_raw = request.POST.get('subject5', '').strip()

        if not all([s1_raw, s2_raw, s3_raw, s4_raw, s5_raw]):

            messages.error(
                request,
                "Please fill out all subject fields before submitting!"
            )

            return render(request, "marksheet.html")

        s1 = float(s1_raw)
        s2 = float(s2_raw)
        s3 = float(s3_raw)
        s4 = float(s4_raw)
        s5 = float(s5_raw)

        t = s1 + s2 + s3 + s4 + s5
        p = (t * 100) / 500

        context = {
            'subject1': s1, 'subject2': s2, 'subject3': s3,
            'subject4': s4, 'subject5': s5, 'total': t, 'per': p
        }

        return render(request, "marksheet.html", context)

    return render(request, "marksheet.html")`
      },
      {
        heading: "Display messages in HTML",
        code: `{% if messages %}
    {% for message in messages %}
        <div>
            {{ message }}
        </div>
    {% endfor %}
{% endif %}`
      }
    ]
  },
  {
    id: 19,
    title: "Django Models",
    description: `Django Models are Python classes that define the structure of database tables. Each class attribute becomes a table column. Django auto-generates the SQL and manages migrations so you never write raw SQL.`,
    sections: [
      {
        heading: "Flow",
        code: `# Python Class
#      ↓
# Django Model
#      ↓
# Database Table
#      ↓
# Table Records`
      },
      {
        heading: "Create App",
        code: `py manage.py startapp appname`
      },
      {
        heading: "models.py — Define a Model",
        code: `from django.db import models


class Service(models.Model):

    service_icon = models.CharField(max_length=50)
    service_title = models.CharField(max_length=50)
    service_des = models.TextField()`
      }
    ]
  },
  {
    id: 20,
    title: "Model Fields",
    description: `Django provides many built-in field types to represent different kinds of data. Choosing the correct field type ensures proper database column creation, validation, and form rendering.`,
    sections: [
      {
        heading: "All Common Model Fields",
        code: `models.CharField()
models.TextField()
models.IntegerField()
models.FloatField()
models.DecimalField()
models.BooleanField()
models.DateField()
models.DateTimeField()
models.TimeField()
models.EmailField()
models.URLField()
models.SlugField()
models.AutoField()
models.BigAutoField()
models.FileField()
models.ImageField()
models.ForeignKey()
models.OneToOneField()
models.ManyToManyField()
models.GenericIPAddressField()
models.UUIDField()
models.DurationField()
models.BinaryField()
models.JSONField()
models.PositiveIntegerField()
models.PositiveSmallIntegerField()
models.SmallIntegerField()
models.BigIntegerField()`
      },
      {
        heading: "Example Usage",
        code: `service_title = models.CharField(max_length=50)
service_des = models.TextField()`
      }
    ]
  },
  {
    id: 21,
    title: "Order and Limit on Model Records",
    description: `Django ORM lets you sort (order) and slice (limit) querysets. Use <code>order_by()</code> for sorting and Python slice syntax <code>[:n]</code> for limiting results — no extra SQL needed.`,
    sections: [
      {
        heading: "Ascending Order",
        code: `Service.objects.all().order_by('service_title')`
      },
      {
        heading: "Descending Order (prefix -)",
        code: `Service.objects.all().order_by('-service_title')`
      },
      {
        heading: "Limit — First 5 records",
        code: `Service.objects.all()[:5]`
      },
      {
        heading: "Limit — Records 5 to 10",
        code: `Service.objects.all()[5:10]`
      },
      {
        heading: "Order + Limit — Latest 5 by ID",
        code: `Service.objects.all().order_by('-id')[:5]`
      }
    ]
  },
  {
    id: 22,
    title: "Dynamic Page",
    description: `Dynamic pages display different content based on data from the URL, database, or request. A single view function handles multiple page variations by reading URL parameters.`,
    sections: [
      {
        heading: "urls.py — Dynamic URL",
        code: `path(
    'course/<int:courseid>/',
    views.courseDetails,
    name='courseDetails'
)`
      },
      {
        heading: "views.py",
        code: `def courseDetails(request, courseid):

    return HttpResponse(
        f"Course ID: {courseid}"
    )`
      },
      {
        heading: "Example",
        code: `# URL: /course/10/
# The value 10 is dynamically passed to the view`
      }
    ]
  },
  {
    id: 23,
    title: "Searching Technique",
    description: `Django ORM provides <code>__icontains</code> for case-insensitive search. Use the <code>Q</code> object to search across multiple fields simultaneously with OR logic.`,
    sections: [
      {
        heading: "views.py — Basic Search",
        code: `def service(request):

    search = request.GET.get('search', '')

    serviceData = Service.objects.all()

    if search:
        serviceData = serviceData.filter(
            service_title__icontains=search
        )

    data = {
        'serviceData': serviceData,
        'search': search
    }

    return render(request, 'service.html', data)`
      },
      {
        heading: "Search Form HTML",
        code: `<form method="GET">

    <input type="text" name="search"
        value="{{ search }}"
        placeholder="Search Service">

    <button type="submit">Search</button>

</form>`
      },
      {
        heading: "Search Multiple Fields with Q",
        code: `from django.db.models import Q


serviceData = Service.objects.filter(
    Q(service_title__icontains=search) |
    Q(service_des__icontains=search) |
    Q(service_icon__icontains=search)
)`
      }
    ]
  },
  {
    id: 24,
    title: "AutoSlugField",
    description: `AutoSlugField automatically generates a URL-friendly slug from another field (like a title). Install the <code>django-autoslug</code> package and use it in your model to get unique, auto-generated slugs.`,
    sections: [
      {
        heading: "Install",
        code: `py -m pip install django-autoslug`
      },
      {
        heading: "models.py — AutoSlugField",
        code: `from autoslug import AutoSlugField


class Service(models.Model):

    service_title = models.CharField(max_length=50)

    slug = AutoSlugField(
        populate_from='service_title',
        unique=True
    )`
      },
      {
        heading: "Run Migrations",
        code: `py manage.py makemigrations
py manage.py migrate`
      },
      {
        heading: "Example",
        code: `# Service Title: Web Development
# Slug:          web-development`
      }
    ]
  },
  {
    id: 25,
    title: "Bootstrap in Django",
    description: `Bootstrap can be included via CDN — no installation needed. Add the Bootstrap CSS link to your base template and use Bootstrap classes directly in your HTML for responsive layouts, navbars, buttons, and forms.`,
    sections: [
      {
        heading: "CDN Link",
        code: `<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
>`
      },
      {
        heading: "Navbar",
        code: `<nav class="navbar navbar-expand-lg bg-body-tertiary">

    <div class="container">

        <a class="navbar-brand" href="#">
            Wscubetech
        </a>

        <div class="navbar-nav">
            <a class="nav-link" href="#">Home</a>
            <a class="nav-link" href="#">About</a>
            <a class="nav-link" href="#">Contact</a>
        </div>

    </div>

</nav>`
      },
      {
        heading: "Button",
        code: `<button class="btn btn-primary">Submit</button>`
      },
      {
        heading: "Form",
        code: `<form>

    <input type="text" class="form-control"
        placeholder="Enter Name">

    <button class="btn btn-primary mt-3">
        Submit
    </button>

</form>`
      }
    ]
  },
  {
    id: 26,
    title: "Pagination",
    description: `Django's built-in <code>Paginator</code> class splits a queryset into pages. Pass a page number via GET parameter, get the page object, and use template tags to render previous/next navigation.`,
    sections: [
      {
        heading: "views.py — Paginator setup",
        code: `from django.core.paginator import Paginator


def service(request):

    serviceData = Service.objects.all()

    paginator = Paginator(serviceData, 6)

    page_number = request.GET.get('page')

    serviceData = paginator.get_page(page_number)

    data = {'serviceData': serviceData}

    return render(request, 'service.html', data)`
      },
      {
        heading: "Simple Pagination HTML",
        code: `<div class="d-flex justify-content-center align-items-center gap-3 mt-4">

    {% if serviceData.has_previous %}
        <a href="?page={{ serviceData.previous_page_number }}"
            class="btn btn-primary">PREVIOUS</a>
    {% endif %}

    <span>{{ serviceData.number }}</span>

    {% if serviceData.has_next %}
        <a href="?page={{ serviceData.next_page_number }}"
            class="btn btn-primary">NEXT</a>
    {% endif %}

</div>`
      },
      {
        heading: "Always-Visible Buttons + Editable Page Number",
        code: `<div class="d-flex justify-content-center align-items-center gap-3 mt-4">

    {% if serviceData.has_previous %}
        <a href="?page={{ serviceData.previous_page_number }}"
            class="btn btn-primary">PREVIOUS</a>
    {% else %}
        <button class="btn btn-secondary" disabled>PREVIOUS</button>
    {% endif %}

    <form method="get" class="m-0">
        <input type="number" name="page"
            value="{{ serviceData.number }}"
            min="1" max="{{ serviceData.paginator.num_pages }}"
            class="form-control text-center" style="width: 70px;">
    </form>

    {% if serviceData.has_next %}
        <a href="?page={{ serviceData.next_page_number }}"
            class="btn btn-primary">NEXT</a>
    {% else %}
        <button class="btn btn-secondary" disabled>NEXT</button>
    {% endif %}

</div>`
      }
    ]
  },
  {
    id: 27,
    title: "Django Important Commands",
    description: `Essential Django management commands for creating projects, apps, running servers, and managing database migrations. These commands are run from the terminal in your project directory.`,
    sections: [
      {
        heading: "Create Project",
        code: `django-admin startproject projectname`
      },
      {
        heading: "Create App",
        code: `py manage.py startapp appname`
      },
      {
        heading: "Run Development Server",
        code: `py manage.py runserver`
      },
      {
        heading: "Make Migrations",
        code: `py manage.py makemigrations`
      },
      {
        heading: "Apply Migrations",
        code: `py manage.py migrate`
      },
      {
        heading: "Create Superuser",
        code: `py manage.py createsuperuser`
      },
      {
        heading: "Change User Password",
        code: `py manage.py changepassword username

# Example:
py manage.py changepassword admin`
      }
    ]
  },
  {
    id: 28,
    title: "Save Form Data to Database using Model",
    description: `Complete workflow to save HTML form data to the database via a Django model. Covers model creation, HTML form, view logic, URL configuration, admin registration, and migrations.`,
    sections: [
      {
        heading: "Step 1 — models.py",
        code: `from django.db import models


class UserSubmission(models.Model):

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    website = models.CharField(
        max_length=200, blank=True, null=True
    )
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"`
      },
      {
        heading: "Step 2 — userform.html",
        code: `<form method="POST" action="">

    {% csrf_token %}

    <input type="text" name="name" placeholder="Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="tel" name="phone" placeholder="Phone" required>
    <input type="text" name="website" placeholder="Website Name">
    <textarea name="message" placeholder="Message" required></textarea>

    <button type="submit">Submit</button>

</form>`
      },
      {
        heading: "Step 3 — views.py",
        code: `from django.shortcuts import render, redirect
from .models import UserSubmission


def user_form_view(request):

    if request.method == 'POST':

        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        website = request.POST.get('website')
        message = request.POST.get('message')

        UserSubmission.objects.create(
            name=name, email=email,
            phone=phone, website=website,
            message=message
        )

        return redirect('thank_you')

    return render(request, 'app_name/userform.html')


def thank_you_view(request):
    return render(request, 'app_name/thankyou.html')`
      },
      {
        heading: "Alternative Save Method",
        code: `data = UserSubmission(
    name=name, email=email,
    phone=phone, website=website,
    message=message
)

data.save()`
      },
      {
        heading: "Step 4 — urls.py",
        code: `from django.urls import path
from . import views


urlpatterns = [
    path('userform/', views.user_form_view, name='user_form'),
    path('thank-you/', views.thank_you_view, name='thank_you'),
]`
      },
      {
        heading: "Step 5 — admin.py",
        code: `from django.contrib import admin
from .models import UserSubmission


@admin.register(UserSubmission)
class UserSubmissionAdmin(admin.ModelAdmin):

    list_display = ('name', 'email', 'phone', 'created_at')
    search_fields = ('name', 'email')`
      },
      {
        heading: "Step 6 — Run Commands",
        code: `py manage.py makemigrations
py manage.py migrate
py manage.py runserver`
      },
      {
        heading: "Flow",
        code: `# HTML Form
#      ↓ POST Request
# request.POST.get()
#      ↓
# Model → .objects.create()
#      ↓
# Database
#      ↓ redirect()
# Thank You Page`
      }
    ]
  },
  {
    id: 29,
    title: "Upload File in Django",
    description: `Django supports file uploads from the admin panel or HTML forms. Configure <code>MEDIA_ROOT</code> and <code>MEDIA_URL</code> in settings, use <code>ImageField</code> or <code>FileField</code> in models, and read uploaded files from <code>request.FILES</code>.`,
    sections: [
      {
        heading: "1. Create Media Folder",
        code: `mypro/
└── media/`
      },
      {
        heading: "2. settings.py",
        code: `MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = '/media/'`
      },
      {
        heading: "3. urls.py — Serve media in development",
        code: `from django.conf import settings
from django.conf.urls.static import static

# At the end of urlpatterns:
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )`
      },
      {
        heading: "4. models.py — ImageField",
        code: `from django.db import models


class Service(models.Model):

    service_icon = models.CharField(max_length=50)
    service_title = models.CharField(max_length=50)
    service_des = models.TextField()

    img = models.ImageField(
        upload_to='images/',
        default=None,
        null=True
    )

# Install Pillow for ImageField:
# py -m pip install Pillow`
      },
      {
        heading: "5. Run Migrations",
        code: `py manage.py makemigrations
py manage.py migrate`
      },
      {
        heading: "6. service.html — Display image",
        code: `{% for n in serviceData %}
<div>
    {% if n.img %}
        <img src="{{ n.img.url }}" class="img-fluid">
    {% endif %}
</div>
{% endfor %}`
      },
      {
        heading: "B) Upload from HTML Form — views.py",
        code: `from django.shortcuts import render, redirect
from .models import Service


def service_add(request):

    if request.method == 'POST':

        service_icon = request.POST.get('service_icon')
        service_title = request.POST.get('service_title')
        service_des = request.POST.get('service_des')

        img = request.FILES.get('img')   # <-- for file uploads

        Service.objects.create(
            service_icon=service_icon,
            service_title=service_title,
            service_des=service_des,
            img=img
        )

        return redirect('service_add')

    return render(request, 'service_add.html')`
      },
      {
        heading: "B) service_add.html — enctype required",
        code: `<form method="POST" enctype="multipart/form-data">

    {% csrf_token %}

    <input type="text" name="service_icon" placeholder="Service Icon">
    <input type="text" name="service_title" placeholder="Service Title">
    <textarea name="service_des" placeholder="Service Description"></textarea>

    <input type="file" name="img">

    <button type="submit">Save</button>

</form>`
      }
    ]
  },
  {
    id: 30,
    title: "Sending Email & SMTP Setup in Django",
    description: `Django provides email functions for sending emails through an SMTP server. Set up Gmail SMTP with 2-Step Verification and an App Password, then use <code>send_mail()</code> or <code>EmailMultiAlternatives</code> for HTML emails.`,
    sections: [
      {
        heading: "settings.py — Gmail SMTP Config",
        code: `EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-16-character-app-password'
EMAIL_USE_TLS = True`
      },
      {
        heading: "views.py — send_mail()",
        code: `from django.core.mail import send_mail


def homePage(request):

    send_mail(
        'Testing Mail',
        'Here is the message.',
        'your-email@gmail.com',
        ['receiver@gmail.com'],
        fail_silently=False,
    )

    return render(request, 'index.html')`
      },
      {
        heading: "Send to Multiple People",
        code: `send_mail(
    'Testing Mail',
    'Here is the message.',
    'your-email@gmail.com',
    [
        'person1@gmail.com',
        'person2@gmail.com',
        'person3@gmail.com'
    ],
    fail_silently=False,
)`
      },
      {
        heading: "HTML Email — EmailMultiAlternatives",
        code: `from django.core.mail import EmailMultiAlternatives


def homePage(request):

    subject = 'Testing Mail'
    from_email = 'your-email@gmail.com'
    msg = '<p>Welcome to <b>Wscubetech</b></p>'
    to = 'receiver@gmail.com'

    email = EmailMultiAlternatives(
        subject, msg, from_email, [to]
    )

    email.content_subtype = 'html'
    email.send()

    return render(request, 'index.html')`
      },
      {
        heading: "Email Flow",
        code: `# Django View
#      ↓
# Email Function
#      ↓
# SMTP Settings
#      ↓
# Gmail SMTP Server
#      ↓
# Recipient
#      ↓
# Email Received`
      }
    ]
  }
];

// ── Storage helpers ──────────────────────────────────────────
function getTopics() {
  try {
    const stored = localStorage.getItem('djangoNotes_topics');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [...DEFAULT_TOPICS];
}

function saveTopics(topics) {
  try {
    localStorage.setItem('djangoNotes_topics', JSON.stringify(topics));
  } catch (e) {}
}

function addTopic(title, description) {
  const topics = getTopics();
  const newId = topics.length > 0 ? Math.max(...topics.map(t => t.id)) + 1 : 1;
  const newTopic = {
    id: newId,
    title: title.trim(),
    description: description.trim(),
    sections: [
      {
        heading: "Notes",
        code: description.trim()
      }
    ]
  };
  topics.push(newTopic);
  saveTopics(topics);
  return newTopic;
}
