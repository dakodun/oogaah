// OogaahTutorialMessageContent4 Class...
//
function OogaahTutorialMessageContent4() {
	OogaahTutorialMessageContent.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialMessageContent4.prototype = Object.create(OogaahTutorialMessageContent.prototype);

OogaahTutorialMessageContent4.prototype.SetCards = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		// cards
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[0]);
		
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[1]);
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[1]);
		
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[2]);
		
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[9]);
		
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[12]);
	}
	
	{
		// "dead" cards (won't ever be played)
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		
		// cards
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[1]);
	}
	
	{
		// "dead" cards (won't ever be played)
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		
		// cards
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[7]);
		
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[8]);
		
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[11]);
	}
	
	{
		// "dead" cards (won't ever be played)
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[0]);
		
		// cards
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[9]);
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[9]);
		
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[10]);
	}
}

OogaahTutorialMessageContent4.prototype.SetMessages = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		currScene.mShowMessage = 4;
		currScene.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"Welcome to the 'Example Round' tutorial!",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 30), "none", 0);
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"In this tutorial we will play a short round of Oogaah.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"It is currently our turn and no cards have been played yet, so we can play whichever cards we like.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(84, 280),
				"Start by playing both of our Goblin Overseers.",
				new Vec2(280, 45), "down", 10, new Vec2(96, 377), new Vec2(39, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		currScene.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"Our Goblin Overseer's ability activated which allows us to play any Goblin Hordes in our hand.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(34, 280),
				"Now would be a great time to get rid of our single Goblin Horde, so play it now.",
				new Vec2(280, 45), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		currScene.mMessageQueue.PushMessage(new Vec2(248, 156),
				"When using this ability, the Current Attack Value and Required Squad Size both become 1, regardless of the number of Goblin Hordes played.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 60), "left", 12, new Vec2(99, 142), new Vec2(99, 84));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		currScene.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The first AI made a play similar to ours (Goblin Overseer, then Goblin Hordes via its ability).",
				new Vec2(280, 60), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		currScene.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The second AI played 2 Goblin Hordes using their ability.",
				new Vec2(280, 45), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(248, 156),
				"This ignores the Required Squad Size (setting both it and the Current Attack Value to the number of Goblin Hordes played).",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 60), "left", 12, new Vec2(99, 142), new Vec2(99, 84));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		currScene.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The third AI just played 2 Orc Berserkers.",
				new Vec2(280, 30), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(74, 280),
				"Notice that our Orc Berserker actually lost some attack value!",
				new Vec2(280, 45), "down", 10, new Vec2(96, 377), new Vec2(19, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"This persists throughout the current battle, so it's usually wise to dispose of them early on.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 126),
				"We can't currently make a move, so pass our turn.",
				new Vec2(280, 45), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"No one could make a move (or chose not to) and it passed back the the last player who played (CPU 3). As a result the current game status has reset and it is now the third AI's turn again.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 75), "none", 0);
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
	}
	
	{
		currScene.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The third AI played an Orc Warchief.",
				new Vec2(280, 30), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(94, 265),
				"Whilst we could play our Being of Energy, sometimes it is wiser to save cards to play in combos later.",
				new Vec2(280, 60), "down", 10, new Vec2(116, 377), new Vec2(19, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 111),
				"So for now, just pass our turn.",
				new Vec2(280, 30), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		currScene.mMessageQueue.PushMessage(new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 126),
				"Once again we'd like to save our cards, so pass.",
				new Vec2(280, 45), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
	}
	
	{
		currScene.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The second AI just played a Human Knight which activated its ability.",
				new Vec2(280, 45), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(248, 210),
				"This means that the only card that can be played next in the current skirmish is a Human Peasant.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "left", 16, new Vec2(99, 230), new Vec2(99, 24));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		currScene.mMessageQueue.PushMessage(new Vec2(34, 280),
				"It's our turn and the Human Knight's ability is still in effect, so play our Human Peasant.",
				new Vec2(280, 45), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		currScene.mMessageQueue.PushMessage(new Vec2(122, 276),
				"It is once again our turn and the current card is a Human Mage.",
				new Vec2(280, 45), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"We can now go on to win the battle from here by playing our Being of Energy. It has the highest attack value and nothing can beat it when it is played by itself.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 75), "none", 0);
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(74, 295),
				"So go ahead and play our Being of Energy.",
				new Vec2(280, 30), "down", 10, new Vec2(96, 377), new Vec2(19, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
	}
	
	{
		currScene.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"The board has been cleared, we have only 1 card left and it is our turn.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		currScene.mMessageQueue.PushMessage(new Vec2(34, 280),
				"Play our last card - the Orc Berserker - and win the battle!",
				new Vec2(280, 45), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		currScene.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"Congratulations, a masterful victory! Continue to return to the main menu.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		currScene.mMessageQueue.mQueue[currScene.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
	}
}

OogaahTutorialMessageContent4.prototype.SetDesired = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	/*
	 * a.[0] 2x Overseer 	- "Play Overseer"
	 * b.[0] 1x Horde 		- "Play Horde"
	 * c.[1] 1x Overseer
	 * d.[1] 2x Horde
	 * e.[2] 2x Horde		- "Notice ability"
	 * f.[3] 2x Berserker	- "Notice ability"
	 * g.[0] Pass 			- "Pass"
	 * h.[1] Pass
	 * i.[2] Pass			- "AI won, reset"
	 */
	
	{
		// a.[0]
		currScene.mPlayers[0].AddDesired(new Array(currScene.mCardList[1], currScene.mCardList[1]),
				"Not quite! Start by playing both of our Goblin Overseers.",
				2, new Vec2(84, 280), new Vec2(280, 45), "down", 10, new Vec2(96, 377), new Vec2(39, 102));
		
		// b.[0]
		currScene.mPlayers[0].AddDesired(new Array(currScene.mCardList[0]),
				"Not quite! Now would be a great time to get rid of our single Goblin Horde, so play it now.",
				1, new Vec2(34, 265), new Vec2(280, 60), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		
		// c.[1]
		currScene.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(currScene.mCardList[1]),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// d.[1]
		currScene.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(currScene.mCardList[0], currScene.mCardList[0]),
				"", 1, new Vec2(), new Vec2(), "none", 0);
		
		// e.[2]
		currScene.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(currScene.mCardList[0], currScene.mCardList[0]),
				"", 2, new Vec2(), new Vec2(), "none", 0);
		
		// f.[3]
		currScene.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(currScene.mCardList[9], currScene.mCardList[9]),
				"", 4, new Vec2(), new Vec2(), "none", 0);
		
		// g.[0]
		currScene.mPlayers[0].AddDesired(new Array(),
				"Not quite! We can't currently make a move, so pass your turn.",
				0, new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 126), new Vec2(280, 45), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		
		// h.[1]
		currScene.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// i.[2]
		currScene.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 1, new Vec2(), new Vec2(), "none", 0);
	}
	
	
	/*
	 * a.[3] 1x Warchief
	 * b.[0] Pass 			- "Pass, don't always play"
	 * c.[1] Pass
	 * d.[2] 1x Paladin
	 * e.[3] Pass
	 * f.[0] Pass			- "pass"
	 * g.[1] Pass
	 */
	
	{
		// a.[3]
		currScene.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(currScene.mCardList[10]),
				"", 3, new Vec2(), new Vec2(), "none", 0);
		
		// b.[0]
		currScene.mPlayers[0].AddDesired(new Array(),
				"Not quite! So for now, just pass our turn.",
				0, new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 111), new Vec2(280, 30), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		
		// c.[1]
		currScene.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// d.[2]
		currScene.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(currScene.mCardList[11]),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// e.[3]
		currScene.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 1, new Vec2(), new Vec2(), "none", 0);
		
		// f.[0]
		currScene.mPlayers[0].AddDesired(new Array(),
				"Not quite! Once again we'd like to save our cards, so pass.",
				0, new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 126), new Vec2(280, 45), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		
		// g.[1]
		currScene.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
	}
	
	
	/*
	 * a.[2] 1x Knight		- "ability"
	 * b.[3] Pass
	 * c.[0] 1x Peasant		- "play peasant"
	 * d.[1] Pass
	 * e.[2] 1x Mage
	 * f.[3] Pass
	 * g.[0] 1x Being		- "play being, setting up for the guaranteed win"
	 * h.[1] Pass
	 * i.[2] Pass
	 * j.[3] Pass
	 */
	
	{
		// a.[2]
		currScene.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(currScene.mCardList[8]),
				"", 2, new Vec2(), new Vec2(), "none", 0);
		
		// b.[3]
		currScene.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 1, new Vec2(), new Vec2(), "none", 0);
		
		// c.[0]
		currScene.mPlayers[0].AddDesired(new Array(currScene.mCardList[2]),
				"Not quite! It's our turn and the Human Knight's ability is still in effect, so play our Human Peasant.",
				0, new Vec2(34, 265), new Vec2(280, 60), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		
		// d.[1]
		currScene.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// e.[2]
		currScene.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(currScene.mCardList[7]),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// f.[3]
		currScene.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 3, new Vec2(), new Vec2(), "none", 0);
		
		// g.[0]
		currScene.mPlayers[0].AddDesired(new Array(currScene.mCardList[12]),
				"Not quite! So go ahead and play our Being of Energy.",
				0, new Vec2(74, 280), new Vec2(280, 45), "down", 10, new Vec2(96, 377), new Vec2(19, 102));
		
		// h.[1]
		currScene.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// i.[2]
		currScene.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// j.[3]
		currScene.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 2, new Vec2(), new Vec2(), "none", 0);
	}
	
	
	/*
	 * a.[0] 1x Berserker
	*/
	
	{
		// a.[0]
		{
			var card = currScene.mCardList[9].GetCopy();
			card.ModifyValue(-2);
			
			currScene.mPlayers[0].AddDesired(new Array(card),
					"Not quite! Play our last card - the Orc Berserker - and win the battle!.",
					1, new Vec2(34, 280), new Vec2(280, 45), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		}
	}
}
// ...End

