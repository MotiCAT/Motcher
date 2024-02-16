import { list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { AutocompleteInteraction, Guild } from 'discord.js';

export async function responseComplete(interaction: AutocompleteInteraction) {
	const focusedValue = interaction.options.getFocused();
	await connect(process.env.MONGO_URL!);
	const Response = new Database('Response');
	list['response'] = await Response.keys();
	const matchingKeys = list['response'].filter((key) => key.split(',')[0] === (interaction.guild as Guild).id);
	const serverData: { [key: string]: string } = {};
	await Promise.all(
		matchingKeys.map(async (key) => {
			const value = await Response.get(key);
			serverData[key] = value;
		})
	);
	const choices: string[] = [];
	for (const key in serverData) {
		const response = serverData[key];
		choices.push(response);
	}

	const filtered = choices.filter((choice) => choice.startsWith(focusedValue));
	await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
}
