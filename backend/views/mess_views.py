from ..models import *
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from ..serializers import *


@api_view(['GET'])
def get_mess_menu(request):
    """
    Get mess menu for the whole week
    """
    menu = Menu.objects.all()
    serializer = MenuSerializer(menu, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def udate_mess_menu(request,day):
    """
    Update mess menu for the whole week
    """
    menu = Menu.objects.get(day=day)
    serializer = MenuSerializer(menu, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

    
    