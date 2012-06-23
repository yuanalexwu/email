{% extends 'base/base_login.tpl' %}
{% block title %}{{ title }}{% endblock %}
{% block style %}
#content{
	width:700px;
	overflow:hidden;
	margin:0px auto;
}
table{
	border-collapse:collapse;
}
table,td{
	border:1px solid black;
}
td{
    width:300px;
    height:20px;
    text-align:center;
}

.tr_color1{
	background-color:white;
}
.tr_color2{
	background-color:#D7D7D7;
}
.title_tr{
	font-weight:700;
	color:black;
}
​
{% endblock %}
{% block content %}
<div id="content">
<h2>登录历史查看</h2>
<table class="list_table">
<tr class="title_tr"><td>ID</td><td>用户名</td><td>时间</td><td>IP</td><td>浏览器</td><td>系统</td><td>备注</td></tr>
{% for log in logList %}
<tr class="{% cycle 'tr_color1' 'tr_color2' %}">
<td>{{ log.userid }}</td>
<td>{{ log.user }}</td>
<td>{{ log.dates|date:"F j,Y" }}</td>
<td>{{ log.ip }}</td>
<td>{{ log.vie }}</td>
<td>{{ log.vwin }}</td>
<td>{{ log.content|safe }}</td>
</tr>
{% endfor %}
</table>
</div>
{% endblock %}