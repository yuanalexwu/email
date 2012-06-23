<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{% block title %}{% endblock %}</title>
    <style type="text/css">{% block style %}{% endblock %}</style>
</head>
<body>
    {% block content %}{% endblock %}
    
    {% block footer %}{% endblock %}
</body>
</html>