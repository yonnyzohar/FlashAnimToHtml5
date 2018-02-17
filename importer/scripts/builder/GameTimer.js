	class GameTimer
	{
		static addUpdateAble(mc)
		{
			GameTimer.updatables.set(mc, true)
		}
		
		static update()
		{
			for (var [key, value] of GameTimer.updatables) {
                key.update();
            }
		}
		
		
		static removeUpdateAble(mc)
		{
			GameTimer.updatables.delete(mc);
				
		}
	}
    
    GameTimer.updatables = new Map();
