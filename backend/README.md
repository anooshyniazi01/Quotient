# Quotient Backend

FastAPI modular monolith backend for Quotient.

## Development

```bash
# Using uv:
uv sync
uv run uvicorn app.main:app --reload --port 8000

# Run tests:
uv run pytest

# Lint:
uv run ruff check .
```
