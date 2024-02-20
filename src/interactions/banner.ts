import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function bannerCommand(interaction: ChatInputCommandInteraction) {
	const user = interaction.options.getUser('user') || interaction.user;
	const targetUser = await interaction.client.users.fetch(user.id, { force: true });
	const banner = targetUser.bannerURL({ size: 1024 });
	if (!banner) return interaction.reply({ content: 'このユーザーにはバナーがありません。', ephemeral: true });
	const embed = new EmbedBuilder().setTitle(`${user.username}のバナー`).setImage(banner).setColor('#0099ff');
	interaction.reply({ embeds: [embed] });
	return;
}
