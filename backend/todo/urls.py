from . import views
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register('todo', views.TodoViewSet, basename="todo")

urlpatterns = [
  path('todo/completed/', views.CompletedTodoListView.as_view(), name='completed-todos'),
]

urlpatterns += router.urls
