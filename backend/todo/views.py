from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.generics import ListAPIView

from . import serializers
from . import models


class CompletedTodoListView(ListAPIView):
    serializer_class = serializers.TodoSerializer

    def get_queryset(self):
        return models.Todo.objects.filter(completed=True)


# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
  queryset = models.Todo.objects.all()
  serializer_class = serializers.TodoSerializer


