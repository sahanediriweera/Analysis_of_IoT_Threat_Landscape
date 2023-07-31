import socket

def main():
    # Take user input for IP address and port
    HOST = input("Enter the IP address to listen on (e.g., 192.168.2.17): ")
    PORT = int(input("Enter the port to listen on (e.g., 8000): "))  # Choose a different port here

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        try:
            server_socket.bind((HOST, PORT))
        except OSError as e:
            print(f"Failed to bind to port {PORT}: {e}")
            return

        server_socket.listen()

        print(f"Waiting for a connection on {HOST}:{PORT}...")
        conn, addr = server_socket.accept()

        with conn:
            print('Connected by', addr)

            received_data = conn.recv(4096).decode().strip()
            print("Received Text:", received_data)
            print("Your text is exposed")

if __name__ == "__main__":
    main()
