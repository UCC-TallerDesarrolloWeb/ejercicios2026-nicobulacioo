# Práctica de comandos Git

Se reproduce el ejercicio de `U1_git_avanzado.html` en un repositorio temporal independiente. La identidad de sus commits es de práctica; no altera el historial ni los cambios del repositorio de la materia.

## Ejecutar
```powershell
node "UNIDAD 1/practica-git.cjs"
```

El programa verifica cada resultado y conserva la carpeta temporal para inspeccionarla.

| Paso | Comando | Resultado que se comprueba |
| --- | --- | --- |
| Inicialización | git init -b main | Repositorio independiente con primer commit |
| Staging | git add practica.txt | Archivo en el área de preparación |
| Retirar de staging | git reset HEAD -- practica.txt | Cambio conservado, fuera de staging |
| Guardar temporalmente | git stash push | Árbol de trabajo limpio |
| Recuperar | git stash apply | Texto modificado recuperado |
| Inspeccionar versión | git checkout HASH | Contenido inicial en HEAD separado |
| Volver | git checkout main | Rama de trabajo recuperada |
| Deshacer commit conservando trabajo | git reset --soft HEAD~1 | Cambios conservados en staging |
| Cambiar mensaje | git commit --amend | Mensaje actualizado en el repositorio temporal |
| Ramas | git switch -c develop | Commit en una rama nueva |
| Integrar y limpiar rama | git merge --no-ff develop; git branch -d develop | Integración completada, árbol limpio |

`stash` guarda cambios temporalmente; no equivale a perderlos. `reset --soft` y `amend` se ensayan aquí sobre commits locales de práctica.

## Actividades con estado separado
La presentación y el .gitignore ya están en el repositorio. Las prácticas grupales de Jira, licencias personales de WebStorm, instalación de extensiones, configuración de autenticación y aprobaciones por otra persona requieren participación del alumno. No se simulan como realizadas.
Las protecciones Classroom existentes se conservan. Una propuesta de ruleset propia requiere revisar su compatibilidad con esas reglas y contar con una persona que pueda aprobar PR.

## Organización de la entrega
Cada unidad que recibe cambios tiene su rama y commits Conventional Commits con fecha real. Los PR y su integración se registran al terminar la validación, sin atribuir fechas de realización anteriores.

