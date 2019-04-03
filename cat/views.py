from django.shortcuts import render

def cat(request):
    return render(request, "cat.html")

# Create your views here.
