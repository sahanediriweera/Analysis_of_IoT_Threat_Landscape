from django.http import HttpResponse
import os 


def index(request):
    directory_path = r"../../Device\ Finger\ Printing/"
    script_path = os.path.join(directory_path, "convertPCAP2CSVAutomated.py")
    print("Path is ")
    os.system(f"cd {directory_path} && ls && python convertPCAP2CSVAutomated.py")

    return HttpResponse("Hello, world. You're at the polls index.")