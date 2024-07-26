.PHONY: run backend frontend

run:
	@xterm -e 'make backend' & echo $$! > backend.pid
	@xterm -e 'make frontend' & echo $$! > frontend.pid

install: i-frontend i-backend

i-frontend:
	cd frontend && pnpm install

i-backend:
	cd backend && pnpm install


backend:
	@echo "Démarrage du backend"
	cd backend && nodemon index.js

frontend:
	@echo "Démarrage du frontend"
	cd frontend && npm run dev

kill:
	@kill `cat backend.pid` || true
	@kill `cat frontend.pid` || true
	@rm -f backend.pid frontend.pid
