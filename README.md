<h1 style='text-align:center;'> Trivia Db Quiz App - React JS </h1>

<strong> In this project, I used the most updated React Js futures with Styled Components; I used React Transition Group to animate when to mount or unmount something from DOM. I took data from OPEN TRIVIA DATABASE and showed users different data in different situations with beautiful animations conditionally. The project has a responsive design for all devices with the most updated CSS features. </strong>

<h3>Netlify Link: https://vigilant-allen-2ab416.netlify.com/#/</h3>
&nbsp;

![Main](https://user-images.githubusercontent.com/57728302/76013725-6a789d80-5ee6-11ea-8988-a2a2267d1a04.gif)

<hr>

<strong> Let's start handling data from API and Bring it ready to use. Firstly I am checking whether the user selected a category or difficulty or not. If there is no selection, questions come randomly. At the endpoint, the correct answer was separate from the wrong answers. I put it among the other answers randomly with the help of 'Math.random()' and 'splice()' methods. And then, I added 'isCorrect' and 'isSelected' values for each answer. Lastly, I created my ready to use object with a question, answers, category and difficulty values.</strong>

&nbsp;
![1-2](https://user-images.githubusercontent.com/57728302/76015245-f12e7a00-5ee8-11ea-9565-442a59a815c9.JPG)
&nbsp;

<strong> Result : </strong>

&nbsp;
![1](https://user-images.githubusercontent.com/57728302/76015623-6d28c200-5ee9-11ea-98c0-32b948c7c801.png)
&nbsp;

<strong> Result : </strong>

&nbsp;
![1](https://user-images.githubusercontent.com/57728302/76015623-6d28c200-5ee9-11ea-98c0-32b948c7c801.png)
&nbsp;

<strong> I provide use three lifeline chances. I want to show how I created the logic for deleting two wrong answers. I created a clone for every variable for setting the state immutable and safely. Firstly I detected wrong answers; according to their length, I deleted 2 of them with the help of 'Math.random()', 'splice()' and filter() methods and sat state. If there are fewer then three answers, I selected the correct answer right away without waiting for the user. Also, I have 'playSound()' function for playing sound after the user used lifeline chance and 'wrongAnswersDeleted' state for the styling button and making it disabled. </strong>

&nbsp;
![2](https://user-images.githubusercontent.com/57728302/76016635-318ef780-5eeb-11ea-8e51-bdb6ba2da472.JPG)
&nbsp;

<strong> When I handle data from API, there was a character problem; I solved it with replace function.</strong>

&nbsp;
![replaceFunction](https://user-images.githubusercontent.com/57728302/76017572-d231e700-5eec-11ea-9554-b45210256156.JPG)
&nbsp;

<hr>

<h2>CSS</h2>

<strong> For design I used 'font-size: 62.5%' technic. Because it is effortless to use and make your design responsive. Now see the picture below. </strong>

&nbsp;

![GlobalStyle](https://user-images.githubusercontent.com/57728302/75311710-adbb7800-5825-11ea-9d40-920450b366b6.JPG)

&nbsp;





<hr>

<h2>JAVASCRIPT</h2>

&nbsp;


<strong> For remoting on components, I used React Router, and the 'history.push()' method was beneficial when I used it for my logo to go home page. </strong>

&nbsp;

![historyPush](https://user-images.githubusercontent.com/57728302/75321447-cedc9280-583e-11ea-878f-3993d5e358ea.JPG)

&nbsp;

<hr>

<h3>Netlify Link: https://agitated-hugle-838e6c.netlify.com/#/</h3>
<h4><strong>Used technologies: </strong> React JS (React Hooks, Styled Components, React Transition Group, React Router, Material UI), HTML, CSS.  </h4>




