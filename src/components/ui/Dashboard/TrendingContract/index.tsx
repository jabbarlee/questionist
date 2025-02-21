import React from 'react'
import { Card } from '@/components/ui/Card'
import { Fire } from '@/data/icons/practice';

export const TrendingContract = () => {

    return(
        <div>
            <Card
                heading='Trending Contract'
                icon={<Fire/>}
                subHeading='Gain more AXP than ever before with a contract'
                premium={true}
            >
                <div>
                    <p>Contract is this and you can press the activate button to activate it anytime!</p>
                </div>
            </Card>
        </div>
    )
}