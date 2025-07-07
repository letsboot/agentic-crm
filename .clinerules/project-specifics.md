# Project-Specific Learnings for CRM FastAPI React
- Use frontend components from the `@chakra-ui/react` core library if applicable.
- NEVER USE THE `Stat` or `StatLabel` or `StatNumber` components! And if you do, import them form `@chakra-ui/stat`.
- Run ` scripts/generate-client.sh` ot regnerate frontend client whenever you change the backend API.
- Run `docker compose run --rm playwright npx playwright test --reporter=line` to run Playwright tests.
- Run `docker exec crm-fastapi-react-backend-1 python3 -m pytest` to run backend tests.
- If you use `npm install` you have to first cd into the frontend folder.
- Do not use browser_action if the user didn't ask you to do something with the browser.
- Do not run the `open` command if the user didn't ask to open the frontend for them.
- Assume the application is running with docker compose in watch mode, if the user doesn't ask you for starting it.
- Use `?devAutoLogin` parameter in browser_action URLs to bypass login (e.g., `http://localhost:5173/contacts?devAutoLogin`) - in browser_action you can use localhost, as you run on the same system.
- Do not check if the app is running if not asked to do so, just assume it's already started by the user.

## Starting the app for development:
- Development Frontend Username: dev@example.com
- Development Frontend Password: DevPassword
- Simplest way for the user to startscr the application (never run this command as AI! as it blocks your terminal): `docker compose watch`
- As an AI running shell commands through Cline/Shell-Tool-Usage you must run commands without blocking the terminal, therefore use this commands instead:
  - Start: `docker compose up --force-recreate --build --detach 2>&1|cat` (use `2>&1|cat` to prevent docker compose from spaming the ouptut)
  - Start Watch Mode (after start): `tmux new-session -d -s crm-app 'docker compose watch'; sleep 15; tmux capture-pane -t crm-app:0; tmux show-buffer; tmux delete-buffer` (always start the watch mode when the user asks you to start the app)
  - Check Status of Watch Mode: `tmux capture-pane -t crm-app:0; tmux show-buffer; tmux delete-buffer`
  - Stop Watch Mode Sessoin: `tmux kill-session -t crm-app`
  - Start the frontend for the user: `open https://localhost:5173`
  - To check if it's running use `docker compose ps` 
- Docker containers need rebuild after backend model changes
