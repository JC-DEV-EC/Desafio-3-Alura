document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game');

    function startGame() {
        gameContainer.innerHTML = `
            <p>¿Quieres seguir hacia el área de Front-End o Back-End?</p>
            <button id="frontend">Front-End</button>
            <button id="backend">Back-End</button>
        `;

        document.getElementById('frontend').addEventListener('click', () => chooseFrontEnd());
        document.getElementById('backend').addEventListener('click', () => chooseBackEnd());
    }

    function chooseFrontEnd() {
        gameContainer.innerHTML = `
            <p>Estás en el área de Front-End. ¿Quieres aprender React o Vue?</p>
            <button id="react">React</button>
            <button id="vue">Vue</button>
        `;

        document.getElementById('react').addEventListener('click', () => specializeOrFullstack('React'));
        document.getElementById('vue').addEventListener('click', () => specializeOrFullstack('Vue'));
    }

    function chooseBackEnd() {
        gameContainer.innerHTML = `
            <p>Estás en el área de Back-End. ¿Quieres aprender C# o Java?</p>
            <button id="csharp">C#</button>
            <button id="java">Java</button>
        `;

        document.getElementById('csharp').addEventListener('click', () => specializeOrFullstack('C#'));
        document.getElementById('java').addEventListener('click', () => specializeOrFullstack('Java'));
    }

    function specializeOrFullstack(choice) {
        gameContainer.innerHTML = `
            <p>Has elegido ${choice}. ¿Quieres especializarte en ${choice} o convertirte en Fullstack?</p>
            <button id="specialize">Especializarme</button>
            <button id="fullstack">Fullstack</button>
        `;

        document.getElementById('specialize').addEventListener('click', () => technologyInput(`Especializándote en ${choice}`));
        document.getElementById('fullstack').addEventListener('click', () => technologyInput('Convirtiéndote en Fullstack'));
    }

    function technologyInput(finalChoice) {
        let technologies = [];

        function askForTechnology() {
            Swal.fire({
                title: '¿En qué tecnología te gustaría especializarte o conocer?',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                inputPlaceholder: 'Escribe aquí...'
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    technologies.push(result.value);
                    Swal.fire({
                        title: `¡Genial! ${result.value} es una excelente elección.`,
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, otra',
                        cancelButtonText: 'No, eso es todo'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            askForTechnology();
                        } else {
                            endGame();
                        }
                    });
                } else {
                    endGame();
                }
            });
        }

        function endGame() {
            Swal.fire({
                title: `${finalChoice}`,
                html: `<p>Has elegido las siguientes tecnologías para aprender:</p><ul>${technologies.map(tech => `<li>${tech}</li>`).join('')}</ul>`,
                confirmButtonText: 'Reiniciar Juego'
            }).then(() => {
                startGame();
            });
        }

        askForTechnology();
    }

    startGame();
});
