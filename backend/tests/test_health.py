from app.api.routes.health import health_check
from app.main import root


def test_health_check_endpoint():
    data = health_check()
    assert data.status == "healthy"
    assert data.service == "Quotient"
    assert data.version == "0.1.0"
    assert data.environment == "development"
    assert data.timestamp is not None


def test_root_endpoint():
    data = root()
    assert data["service"] == "Quotient"
    assert data["tagline"] == "Monitor every API. Master every limit."
    assert data["version"] == "0.1.0"
    assert "docs" in data
