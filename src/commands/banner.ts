import { Message, EmbedBuilder } from 'discord.js';

export async function bannerCommand(message: Message) {
	const user = message.mentions.users.first() || message.author;
	const targetUser = await message.client.users.fetch(user.id, { force: true });
	const banner = targetUser.bannerURL({ size: 1024 });
	if (!banner) return message.reply('バナーが設定されていませんでした。');
	const embed = new EmbedBuilder().setTitle(`${user.displayName}のバナー`).setImage(banner).setColor('#0099ff');
	message.reply({ embeds: [embed] });
	return;
}
