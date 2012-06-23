<h2>普通用户</h2>
<div id="user_div">
<table class="list_table">
<tr class="title_tr"><td>用户名</td><td>操作</td></tr>
{% for user in userlist %}
<tr class="{% if forloop.counter|divisibleby:2 %}tr_color1{% else %}tr_color2{% endif %}">
<td><a href="" v="{{ user.uid }}" n="{{ user.username }}" p="{{ user.power }}">{{user.username}}</a></td>
<td><input type="checkbox" class="select_chk" name="items" v="{{user.uid}}"/></td>
</tr>
{% endfor %}
</table>
</div>
<h2>管理员</h2>
<div id="manager_div">
<table class="list_table">
<tr class="title_tr"><td>用户名</td><td>操作</td></tr>
{% for manager in managerlist %}
<tr class="{% if forloop.counter|divisibleby:2 %}tr_color1{% else %}tr_color2{% endif %}">
<td><a href="" v="{{ manager.uid }}" n="{{ manager.username }}" p="{{ manager.power }}">{{manager.username}}</a></td>
<td><input type="checkbox" class="select_chk" name="items" v="{{manager.uid}}"/></td>
</tr>
{% endfor %}
</table>
</div>