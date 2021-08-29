## LabenuSystem:
### Turma Molina | Grupo I
#### Integrantes
 - Danilo Chagas
 - Ishmaiha Kim
 - Lucas Gomes
 - Matheus Pimentel Freire

#### O que funciona
- [x] 01. Criar estudante;
- [x] 02. Criar docente;
- [x] 03. Criar turma;
- [x] 04. Adicionar estudante na turma;
- [x] 05. Adicionar docente na turma;
- [x] 06. Pegar a idade de algum estudante a partir do id
- [x] 07. Exibir estudantes de uma turma;
- [x] 08. Exibir docentes de uma turma;
- [x] 09. Exibir estudantes que possuam o mesmo hobby;
- [x] 10. Remover estudante de uma turma;
- [x] 11. Remover estudante;
- [x] 12. Remover docente de uma turma;
- [x] 13. Mudar turma de módulo

#### API
- [Documentação API Postman](https://documenter.getpostman.com/view/16227218/TzzHnZHp)
- [Acessar coleção Postman](https://app.getpostman.com/run-collection/16227218-601688d8-3696-4d13-b30f-ccb010803904?action=collection%2Ffork&collection-url=entityId%3D16227218-601688d8-3696-4d13-b30f-ccb010803904%26entityType%3Dcollection)

<details>
<summary>Requisitos Mínimos do Projeto</summary>

Você estuda na Labenu_ há tanto tempo que já parecem anos, não é? Então, hoje, vamos pedir para criar um sistema que represente o básico da nossa organização. 

Ele deve possuir, ao menos, as 3 entidades importantes:

1. Estudantes 

    Representa estudantes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e os principais hobbies dele. 

2. Docente

    Representa docentes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e todas as especialidades dele. Há 7 especialidades: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend

3. Turma

    Toda turma é composta das seguintes características: id, nome, data de início, data de término, lista de professores responsáveis, uma lista de alunos e módulo atual em que a turma está.

    O módulo pode assumir os valores de 1 a 7 ou `0`, indicando que as aulas dessa turma ainda não começaram. Para esse exercício, vamos considerar que existam dois tipos de turma: integral ou noturna. Há uma restrição para o nome das turmas noturnas: tem que terminar com `-na-night`.

As funcionalidades básicas são:

→ Criar estudante;

→ Criar docente;

→ Criar turma;

→ Adicionar estudante na turma;

→ Adicionar docente na turma;

→ Pegar a idade de algum estudante a partir do id
</details>
