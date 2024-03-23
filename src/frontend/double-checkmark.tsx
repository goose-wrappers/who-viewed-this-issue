import {Image} from '@forge/react';
import React from 'react';

export const DoubleCheckmark: React.FC = () => {
	const PNG64 = "data:image/png;base64,";
	const ICON64 = "iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEhSURBVHgBnZJBTsMwEEXHtoxEC1K2SAW1N0hvADfIDSgLsmAFJ2i4AcsqG9oT0BtwBMIJqKCssQTpAquezrRJm0hVlPRLVjLf4+fx2AIOUCv8HgrAQLfslXnqGfZOw89ASZ1IaKgMFtGvv1yoy9xzIF+sW741AhZgQN/H3/hiWvIETsShsL/4PCp6pEkadwZimyywq4/tQ96T9t3c104ZMzqb1YWt573Bh2eP9E82kXCjbaoDWvlM8YzGlMZ9HRhLmnHPcGIW+3ahX4VCBnGl3SawTV6mk/ArQhDDvFLqcAKIebLRUvX/nbuugpWAe6BlIVUswKuCrY9cDPhI5NzsdqNWIPS5wjqwzZo94lfvpPTSUWfMcft27gu6JAR4r4KxVosenbnpUjS0AAAAAElFTkSuQmCC";

	return (
		<Image alt="" src={PNG64 + ICON64}/>
	);
}
