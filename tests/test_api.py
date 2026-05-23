import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            ".."
        )
    )
)

from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_home():

    response = client.get("/")

    assert response.status_code == 200