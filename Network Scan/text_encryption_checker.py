import string

def search_text_telnet(ip_address, port):
    try:
        received_text = b"Encrypted Text: Xp$#@!lsd^&*JLMZq23\n"

        return received_text

    except ConnectionRefusedError:
        print("Connection refused. Please check the IP address and port.")
    except Exception as e:
        print("An error occurred:", str(e))

def get_received_text():
    ip_address = input("Enter the IP address: ")
    port = int(input("Enter the port number: "))

    response = search_text_telnet(ip_address, port)

    encodings = ["utf-8", "latin-1"]
    decoded_text = ""
    for encoding in encodings:
        try:
            decoded_text = response.decode(encoding)
            break
        except UnicodeDecodeError:
            continue

    print(f"Received Text:\n{decoded_text}")

    if is_encrypted(decoded_text):
        print("The received text is encrypted.")
    else:
        print("The received text is not encrypted.")

def is_encrypted(text):

    non_printable_count = sum(c not in string.printable for c in text)
    non_printable_percentage = non_printable_count / len(text) * 100

    threshold = 30
    if non_printable_percentage >= threshold:
        return True
    else:
        return False

if __name__ == "__main__":
    get_received_text()
