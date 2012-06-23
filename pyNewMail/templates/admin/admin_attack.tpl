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
}​
{% endblock %}
{% block content %}
<div id="content">
<h2>攻击记录</h2>
<table class="list_table">
<tr class="title_tr"><td>邮件地址</td><td>攻击时间</td><td>导出邮件</td></tr>
{% for log in attackList %}
<tr class="{% cycle 'tr_color1' 'tr_color2' %}">
<td>{{ log.dsmail }}</td>
<td>{{ log.senddate|date:"F j,Y" }}</td>
<td><a href="#">导出邮件{{ log.uid }}</a></td>
</tr>
{% endfor %}
</table>
</div>
{% endblock %}