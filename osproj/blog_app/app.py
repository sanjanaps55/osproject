from flask import Flask, request, jsonify, render_template

application = Flask(__name__)  # Changed app to application for consistency

posts = []

@application.route('/')
def home():
    return render_template('index.html')

@application.route('/posts', methods=['GET'])
def get_posts():
    return jsonify(posts)

@application.route('/posts', methods=['POST'])
def add_post():
    title = request.json.get('title')
    content = request.json.get('content')
    if title and content:
        post = {"title": title, "content": content}
        posts.append(post)
        return jsonify({"message": "Post added"}), 201
    return jsonify({"error": "Title or content is missing"}), 400

if __name__ == '__main__':
    application.run(host='0.0.0.0', port=5000)
