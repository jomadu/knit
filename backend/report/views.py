from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.parsers import JSONParser

from user.models import CustomUser
from report.models import Report
from report.serializers import ReportSerializer

@csrf_exempt
def report_list(request):
  '''
  List all reports
  '''
  if request.method == "GET":
    reports = Report.objects.all()
    serializer = ReportSerializer(reports, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def report_detail(request, pk):
  '''
  Retrieve, update or delete a report
  '''

  try:
    report = Report.objects.get(pk=pk)
  except Report.DoesNotExist:
    return HttpResponse(status=status.HTTP_404_NOT_FOUND)

  if request.method == "GET":
    serializer = ReportSerializer(report)
    return JsonResponse(serializer.data)

  elif request.method == "PUT":
    data = JSONParser().parse(request)
    serializer = ReportSerializer(report, data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == "DELETE":
    report.delete()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)
