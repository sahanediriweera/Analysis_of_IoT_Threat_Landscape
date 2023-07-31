import socket

def main():
    host = input("Enter the server IP: ")
    port = int(input("Enter the server port: "))

    message = input("Enter the message to send: ")

    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
            client_socket.connect((host, port))
            client_socket.sendall(message.encode())
            print("Message sent successfully!")
    except ConnectionError as e:
        print(f"Error occurred while connecting: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()

