export const handleChoiceSelect = (choice: string, questionIndex: number, setSelectedChoices: React.Dispatch<React.SetStateAction<(string)[]>>, selectedChoices: (string | null)[]) => {
    setSelectedChoices(prevChoices => {
        const updatedChoices = [...prevChoices];
        updatedChoices[questionIndex] = choice;
        return updatedChoices;
    });

    console.log(selectedChoices);
  };