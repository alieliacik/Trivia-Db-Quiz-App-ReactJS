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

<strong> I provide use three lifeline chances. I want to show how I created the logic for deleting two wrong answers. I created a clone for every variable for setting the state immutable and safely. Firstly I detected wrong answers; according to their length, I deleted 2 of them with the help of 'Math.random()', 'splice()' and filter() methods and sat state. If there are fewer then three answers, I selected the correct answer right away without waiting for the user. Also, I have 'playSound()' function for playing sound after the user used lifeline chance and 'wrongAnswersDeleted' state for the styling button and making it disabled. </strong>

&nbsp;
![2](https://user-images.githubusercontent.com/57728302/76016635-318ef780-5eeb-11ea-8e51-bdb6ba2da472.JPG)
&nbsp;

<strong> When I handle data from API, there was a character problem; I solved it with replace function.</strong>

&nbsp;
![replaceFunction](https://user-images.githubusercontent.com/57728302/76017572-d231e700-5eec-11ea-9554-b45210256156.JPG)
&nbsp;

<strong> I showed the user question's category and difficulty level for each question. When I took data from API, some of them had 'Category: part some of them not. I removed 'Category: ' conditionally if they have and added to all of them. Whit this technic I prevented duplication. The difficulty level had not capitalized; I made it capitalized with 'toUpperCase()' and 'slice()' methods.</strong>

&nbsp;
![3](https://user-images.githubusercontent.com/57728302/76018550-399c6680-5eee-11ea-9b73-b36cdc1f1d3b.JPG)
&nbsp;

<strong> At the end of the quiz, I needed to calculate the answered questions. I did it with nested map functions for all questions and their answers if the answer's 'isSelected === true'</strong>

&nbsp;
![Answered](https://user-images.githubusercontent.com/57728302/76018827-bfb8ad00-5eee-11ea-8d2d-dd5b9a96d6ab.JPG)
&nbsp;

<h2> For Beter User Experience </h2>

&nbsp;
<strong>If the user doesn't fill the name input area, app fires alert. </br>
If the user doesn't select the category or the difficulty level, the app brings random questions for the unselected section. </br> 
After the user fill up the input name area app doesn't ask username until the user clicks the rename icon.</br>
The Previous button for the first question, the Next button for the last question, lifeline chance buttons if the user doesn't have any unclickable.</br>
If only one answer remains after the user has used the lifeline chances, the application directly selects that answer and prevents using the 'Select Correct Answer' lifeline.</br>
If less than 10 seconds remaining for the quiz, remaining time and it's line change the color.</br>
User can see quiz summary at the and of the quiz with selected and correct answers.
</strong>
&nbsp;

<hr>

<h2>CSS</h2>

<strong> For design I used 'font-size: 62.5%' technic. Because it is effortless to use and make your design responsive. Now see the picture below. </strong>

&nbsp;
![globalState](https://user-images.githubusercontent.com/57728302/76023609-77ea5380-5ef7-11ea-8fd5-8ead8c123a7d.JPG)
&nbsp;

<strong> After I made 0 all margins and paddings for whole dom elements, including before and after elements, I sat font size to %62.5 with the help of Styled Components createGlobalStyle. It means every one rem equal 10px now. Of course, I could use 10px instead of 1rem. But if you use for your whole parameters; when you start to make your device responsive for small screen devices, all you have to do just decrease the font size and your whole 1rems 8.5px now instead of 10. I reached this result with just decreasing HTML font size. Font sizes, margins, paddings, height and widths have rem value. With a small decrease of HTML font-size value, my website almost full responsive for I tablet except a couple of little things. See the gif below... </strong>

&nbsp;
![responsiveGif](https://user-images.githubusercontent.com/57728302/76023709-ac5e0f80-5ef7-11ea-8f93-ace5c5e87111.gif)
&nbsp;

<strong> Curved header with adding the Header '::after' pseudo element. </strong>

&nbsp;
![after](https://user-images.githubusercontent.com/57728302/76023925-2db5a200-5ef8-11ea-8bd1-0ad4cc01f3f5.JPG)
&nbsp;


<strong>With the power of the Styled Components, you can see how I animated when the user selects a category or difficulty. </strong>

&nbsp;
![add outline](https://user-images.githubusercontent.com/57728302/76024104-84bb7700-5ef8-11ea-8079-c95cb7f75a72.JPG)
&nbsp;
![selectaniamtion](https://user-images.githubusercontent.com/57728302/76024307-d95ef200-5ef8-11ea-997a-bacc134a2e1b.gif)
&nbsp;

<strong>As you can see, remained time connected with the pseudo-element of the header. It changes color if the user has fewer than 10 seconds.</strong>

&nbsp;
![remained](https://user-images.githubusercontent.com/57728302/76024902-e0d2cb00-5ef9-11ea-8697-500b306198a4.JPG)
&nbsp;
![remined](https://user-images.githubusercontent.com/57728302/76024905-e29c8e80-5ef9-11ea-8a5f-69fcaff30690.gif)
&nbsp;

<strong>I created this beautiful hover-select animation with the help of Styled Components again. I have different transition timing for different CSS properties. Also, with the 'cubic-bezier' property, I made animation more sweeter. </strong>

&nbsp;
![AnswerAnimation](https://user-images.githubusercontent.com/57728302/76025290-aae21680-5efa-11ea-8e95-3687cf4e61d8.JPG)
&nbsp;
![answerAnimation](https://user-images.githubusercontent.com/57728302/76025289-aa498000-5efa-11ea-99d9-bd6611e383ea.gif)
&nbsp;

<strong>I made this animation with different animation and different animations timings. </strong>

&nbsp;
![AnswerAnimation](https://user-images.githubusercontent.com/57728302/76025980-f3e69a80-5efb-11ea-951f-06c6275f20d2.JPG)
&nbsp;
![answerslide animation](https://user-images.githubusercontent.com/57728302/76025990-f648f480-5efb-11ea-82bc-a5183e1304ee.gif)
&nbsp;
<hr>

<strong>I accomplished this style and animation with the help of React Transition Group. I could animate while unmounting stats. Also, I showed the user correct and wrong answers with different color and background colors. If the user selects the answer and it is correct or if the user selects the answer and it is incorrect or if the user doesn't select an answer, style changes. With the nested Ternary Operator, I accomplished this result with just one line code. </strong>

&nbsp;
![CSS trasition](https://user-images.githubusercontent.com/57728302/76026561-057c7200-5efd-11ea-8564-730aaf298430.JPG)
&nbsp;
![NestedTernary](https://user-images.githubusercontent.com/57728302/76026556-031a1800-5efd-11ea-99ee-60bfc90b1ef5.JPG)
&nbsp;

<strong>Result : </strong>
&nbsp;
![nested ternary gif](https://user-images.githubusercontent.com/57728302/76026551-001f2780-5efd-11ea-9671-81c1884775b7.gif)
&nbsp;

<hr>

<h3>Netlify Link: https://vigilant-allen-2ab416.netlify.com/#/</h3>
<h4><strong>Used technologies: </strong> React JS (React Hooks, Styled Components, React Transition Group, React Router), HTML, CSS.  </h4>




