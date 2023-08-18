
import socket
from cryptography.fernet import Fernet

def encrypt_message(message, key):
    fernet = Fernet(key)
    encrypted_message = fernet.encrypt(message.encode())
    return encrypted_message

def main():
    host = input("Enter the server IP: ")
    port = int(input("Enter the server port: "))

    # Generate a random encryption key (you should use a better key management strategy in a real application)
    key = Fernet.generate_key()

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        server_socket.bind((host, port))
        server_socket.listen()

        print(f"Server listening on {host}:{port}")

        connection, address = server_socket.accept()
        with connection:
            print(f"Connected to {address}")

            data = connection.recv(4096).decode().strip()
            print(f"Received message from client: {data}")

            encrypted_message = encrypt_message(data, key)
            print(f"Encrypted message: {encrypted_message}")
            print("Received text is encrypted")

if __name__ == "__main__":
    main()