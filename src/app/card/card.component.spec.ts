import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

const mockData = [
    {
        html_url: 'https://github.com/user1/repo1',
        name: 'Repo 1',
        description: 'This is a sample description for Repo 1.',
        topics: ['topic1', 'topic2']
    },
    {
        html_url: 'https://github.com/user2/repo2',
        name: 'Repo 2',
        description: 'This is a sample description for Repo 2.',
        topics: ['topic3', 'topic4']
    }
];

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        component.data = mockData;
        fixture.detectChanges();
    });

    
});
