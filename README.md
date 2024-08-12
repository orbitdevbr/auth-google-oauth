# Cadastro e autenticação com Google OAuth

Esse é o repositório onde implementamos um cadastro com login e sessão com as seguintes tecnologias e estratégias:

- OAuth / JWT (JSON Web Token)
- NextJS - App Router
- NextJS - API Routes (NodeJS)
- Postgres Serverless (Neon)
- Tailwind CSS
- Shadcn UI
- Typescript

## Redes sociais

https://www.youtube.com/@orbitdevbr
https://www.tiktok.com/@orbitdevbr
https://www.instagram.com/orbitdev/

## Passos:

1. Jeito antigo que o Google ainda mostra
2. Criar credenciais → ID do cliente OAuth → Tela de permissão OAuth
3. Carregar biblioteca no front (Google GSI)
4. Criar o código de integração, referência pronta
5. Mostrar o botão de login com o Google na tela
6. Receber o token de autenticação (JWT) no front para enviar para o back
7. Validar o JWT no back
8. Criar conta ou fazer login
9. Gerar seu próprio JWT com suas informações
10. Criar middleware que vai validar o novo JWT todas as vezes
11. Aplicação protegida
