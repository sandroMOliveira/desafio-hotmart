<h1>
Passo a Passo
</h1>

<h2>
Rodar o Django
</h2>

<h3>
Instalar depedencias
</h3>
Instale as dependencias do projeto
Para instalar as dependencias do projeto:

```
cd api
pip install -r requirements.txt
PS: Use python3 para esse projeto
```

<h3>
Rodar o Django em sua Network 
</h3>

Rode o comando python manage.py runserver para que o backend possa ser utilizado externamente

Exemplo

```
python manage.py runserver 192.168.1.3:8000
```

<h2>
JavaScript ReactJS
</h2>

Para rodar o ReactJs:
 ```
cd ui/avaliacao
npm install
npm start
PS: Pode haver a necessidade de instalar alguma biblioteca
 ```

 <h3>
 Arquivo consts.js
 </h3>

 No arquivo consts.js vc ira colocar o host em que sua aplicacao web possa rodar.

 ```
Padrão:
 export const API_HOST = 'http://localhost:8000'
 Para rodar externamente use o ip que você colocou no Django
 ```