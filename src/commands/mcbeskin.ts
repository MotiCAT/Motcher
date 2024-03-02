import { embeds } from '../embeds';
import axios from 'axios';
import { Message, EmbedBuilder } from 'discord.js';

export async function mcbeskinCommand(message: Message) {
	const name = message.content.split(' ')[1];
	if (!name) return message.reply(embeds.mcbeskinHelp);
	try {
		const response = await axios.get(`https://api.geysermc.org/v2/xbox/xuid/${name}`);
		const xuid = response.data.xuid.toString(16).toUpperCase();
		const uuid = '00000000-0000-0000-000' + xuid.slice(0, 1) + '-' + xuid.slice(1);
		const embed = new EmbedBuilder()
			.setTitle(`${name}のスキン`)
			.setColor('#0099ff')
			.setImage(`https://api.tydiumcraft.net/v1/players/skin?uuid=${uuid}&type=player`)
			.setThumbnail(`https://api.tydiumcraft.net/v1/players/skin?uuid=${uuid}&type=skin`);
		message.reply({ embeds: [embed] });
	} catch (error) {
		message.reply(embeds.defaultError);
	}
}
