Para lograr esto sin tocar la web de GitHub, usaremos **Git** (para el control de versiones local) y el **GitHub CLI (`gh`)**, que es la herramienta oficial de GitHub para manejar repositorios desde la consola.

---

## 1. Requisitos Previos

Antes de empezar, debes tener instalado:

1. **Git:** Verifica con `git --version`
2. **GitHub CLI:** Verifica con `gh --version`
3. **Autenticación:** Ejecuta `gh auth login` y sigue las instrucciones (solo necesitas hacerlo una vez)

---

## 2. El Paso a Paso: Creación del Proyecto

```bash
# Crear la carpeta del proyecto
mkdir mi-proyecto-genial

# Entrar a la carpeta
cd mi-proyecto-genial

# Inicializar el repositorio local
git init

# Crear el archivo README.md
echo "# Mi Proyecto Genial" >> README.md

# Agregar el archivo al repositorio
git add README.md

# Hacer el primer commit
git commit -m "Primer commit: Initial setup"

# Crear el repositorio en GitHub y subir los archivos (--public para público, --private para privado)
gh repo create mi-proyecto-genial --public --source=. --remote=origin --push
```

---

## 3. Resumen de Comandos Útiles

A partir de ahora, tu flujo de trabajo será el estándar de Git:

| Acción | Comando |
| --- | --- |
| **Ver estado** | `git status` |
| **Agregar cambios** | `git add .` |
| **Confirmar cambios** | `git commit -m "mensaje"` |
| **Subir a GitHub** | `git push` |
| **Ver el repo en la web** | `gh browse` |

---

### ¿Qué sigue?

Ya tienes tu repo vivo y coleando en la nube sin haber hecho un solo clic en la interfaz de GitHub.