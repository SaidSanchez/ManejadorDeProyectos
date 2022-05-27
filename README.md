# Proyecto reto III: Desarrollar un manejador de proyectos

## Description:
En esta publicación encontraras el documento que contiene el marco del proyecto a desarrollar durante el curso y tendrá valor en cada evaluación según los criterios de evaluación. Toma en cuenta las siguientes cuestiones:

1) Selecciona tu equipo (el número de integrantes dependerá de lo acordado en clase).

2) Comprendan el documento adjunto y discutan entre los integrantes del equipo.

3) Sí existen dudas pregunten inmediatamente en la publicación o con el profesor en clase.

4) Al final de cada periodo existirá una tarea donde se deberá entregar los puntos a evaluar (uno por cada periodo).

5) Recuerda que se evalúa calidad del código, completitud del proyecto, funcionalidades, entrega a tiempo, participación de todo el equipo y correcta documentación y pruebas.


### Diagrama de clases

```mermaid
classDiagram
	direction RL
	class Project {
		-int id
		-String name
		-Date requestDate
		-Date startDate
		-String description
		-User productOwner
		-User scrumMaster
		-List~User~ team
		-Board board
		+getId() int
		+getName() String
		+getRequestDate() Date
		+getStartDate() Date
		+getDescription() String
		+getProductOwner() User
		+getScrumMaster() User
		+getTeam() List~User~
		+getBoard() Board
		+callDailyScrum()
	}

	class User {
		-int id
		-String name
		-String dadLastName
    -String momLastName
		-Date birthday
    -String curp
    -String rfc
    -String address
		-List~Skill~ skills
		-String password
		-String salt
		+getId() int
		+getName() String
		+getDadLastName() String
		+getMomLastName() String
		+getBirthday() Date
		+getCurp() String
		+getRfc() String
		+getAddress() String
		+getSkills() List~Skill~
		-getPassword() String
		-getSalt() String
		+setPassword(String)
		+addSkill(int)
		+removeSkill(int)
		+authN(String) String
	}
	User --o Project

	class Skill {
		-int id
		-String name
		-Rank rank
		+getId() int
		+getName() String
		+getRank() Rank
	}
	Skill --o User

	class Rank {
		<<enumeration>>
		JUNIOR
		SENIOR
		MASTER
	}
	Rank <-- Skill

	class Board {
		-int id
		-Backlog productBacklog
		-List~Backlog~ releases
		-List~Backlog~ sprints
		+getId() int
		+getProductBacklog() Backlog
		+getReleases() List~Backlog~
		+getSprints() List~Backlog~
		+postStory(int)
		+startRelease()
		+startSprint()
		+moveToRelease(int)
		+moveToSprint(int)
	}
	Board --* Project

	class Backlog {
		-int id
		-String name
		-List~Story~ stories
		-List~int~ burndown
		+getId() int
		+getName() String
		+getStories() List~Story~
		+getBurndown() List~int~
		+estimateRemaining() int
		+estimateSpeed() float
	}
	Backlog --* Board

	class Story {
		-int id
		-String name
		-Priority priority
		-int size
		-String feature
		-bool validated
		+getId() int
		+getName() String
		+getPriority() Priority
		+getSize() int
		+getFeature() String
		+getValidated() bool
		+setPriority(Priority)
		+setSize(int)
		+setValidated(bool)
	}
	Story --* Backlog

	class Priority {
		<<enumeration>>
		LOW
		MEDIUM
		HIGH
	}
	Priority <-- Story
```


## Work Team:
* Alan Said Sanchez Sausameda 307730
* Andrés Romero Ramos 329540

## Installation:

Usar el manejador de paquetes npm para instalar las dependencias.
```
npm install
```
Para lanzar el proyecto usamos el comando:

```
npm start
```
La app será lanzada en el puerto 3000.

# Aplicación lanzada en heroku con el link:

https://manejadordeproyectos.herokuapp.com/

Licencia:

Uso libre.
