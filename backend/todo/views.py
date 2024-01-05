from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status

from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers
from . import models

class DeleteCompletedTodos(APIView):
    def delete(self, request, *args, **kwargs):
        completed_todos = models.Todo.objects.filter(completed=True)
        completed_todos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CompletedTodoListView(ListAPIView):
    serializer_class = serializers.TodoSerializer

    def get_queryset(self):
        return models.Todo.objects.filter(completed=True)


# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
  queryset = models.Todo.objects.all().order_by('-created')
  serializer_class = serializers.TodoSerializer
