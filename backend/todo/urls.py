from . import views
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register('todo', views.TodoViewSet, basename="todo")

urlpatterns = [
  path('todo/completed/', views.CompletedTodoListView.as_view(), name='completed-todos'),
  path('todo/delete-completed/', views.DeleteCompletedTodos.as_view(), name='delete-completed-todos'),
]

urlpatterns += router.urls
