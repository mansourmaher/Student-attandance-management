FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install

# ✅ Hardcode the backend URL
ENV VITE_API_URL=https://student-attandance-management.onrender.com

RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]