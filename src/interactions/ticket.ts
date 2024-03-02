import { EmbedBuilder, ChatInputCommandInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export async function ticketCommand(interaction: ChatInputCommandInteraction) {
	const title = interaction.options.getString('title') ?? 'お問い合わせ';
	const description = interaction.options.getString('description') ?? 'ボタンを押してチケットを作成してください。';
	const embed = new EmbedBuilder().setTitle(title).setDescription(description).setColor('#0099ff').setFooter({ text: 'Motcher v2.0' });

	const button = new ButtonBuilder().setCustomId('createticket').setLabel('Create Ticket🎫').setStyle(ButtonStyle.Primary);

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);
	await interaction.channel?.send({ embeds: [embed], components: [row] });
	await interaction.reply({ content: 'チケットを作成しました。', ephemeral: true });
}
