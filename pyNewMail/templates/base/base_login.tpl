<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{% block title %}{% endblock %}</title>
    <link rel="stylesheet" type="text/css" href="/site_media/css/toolbar.css">
    <style>{% block style %}{% endblock %}</style>
    <script language="javascript" type="text/javascript" src="/site_media/js/jquery-1.7.2.js"></script>
</head>
<body>
	{% include 'base/toolbar.tpl' %}
    {% block content %}{% endblock %}
    {% block footer %}{% endblock %}
</body>
<script language="javascript" type="text/javascript">
{% block js %}{% endblock %}
</script>
</html>